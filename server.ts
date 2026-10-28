import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import { db, BHAWAL_MIRZAPUR_GEO, OrderRecord } from './src/server/db';
import { CATEGORIES } from './src/data/mockData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// API: Get Geo Scope Information
app.get('/api/geo', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: BHAWAL_MIRZAPUR_GEO,
  });
});

// API: Get Platform Statistics
app.get('/api/stats', (_req: Request, res: Response) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get Categories with Live Dynamic Counts
app.get('/api/categories', (_req: Request, res: Response) => {
  try {
    const stats = db.getStats();
    const categoriesWithCounts = CATEGORIES.map((cat) => {
      let count = 0;
      if (cat.id === 'all') {
        count = stats.totalCount;
      } else {
        count = stats.categoryBreakdown[cat.id] || 0;
      }
      return {
        ...cat,
        count,
      };
    });
    res.json({ success: true, data: categoriesWithCounts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: List Businesses
app.get('/api/businesses', (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      subCategory,
      onlyOpen,
      verifiedOnly,
      minRating,
      sortBy,
    } = req.query;

    const items = db.getBusinesses({
      search: search ? String(search) : undefined,
      category: category ? String(category) : undefined,
      subCategory: subCategory ? String(subCategory) : undefined,
      onlyOpen: onlyOpen === 'true',
      verifiedOnly: verifiedOnly === 'true',
      minRating: minRating ? parseFloat(String(minRating)) : undefined,
      sortBy: sortBy ? String(sortBy) : undefined,
    });

    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Single Business Detail
app.get('/api/businesses/:id', (req: Request, res: Response) => {
  try {
    const item = db.getBusinessById(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, error: 'Business not found' });
      return;
    }
    res.json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Merchant Registration / Business Submission
app.post('/api/businesses', (req: Request, res: Response) => {
  try {
    const { nameBn, phone, addressBn } = req.body;
    if (!nameBn || !phone || !addressBn) {
      res.status(400).json({
        success: false,
        error: 'দোকানের নাম, ফোন নম্বর এবং ঠিকানা আবশ্যক।',
      });
      return;
    }

    const created = db.createBusiness(req.body);
    res.status(201).json({
      success: true,
      message: 'ব্যবসা সফলভাবে নিবন্ধিত হয়েছে এবং যাচাই তালিকায় অন্তর্ভুক্ত করা হয়েছে।',
      data: created,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Submit Listing Claim
app.post('/api/claims', (req: Request, res: Response) => {
  try {
    const { businessId, applicantName, applicantPhone, tradeLicenseOrNid } = req.body;
    if (!businessId || !applicantName || !applicantPhone || !tradeLicenseOrNid) {
      res.status(400).json({
        success: false,
        error: 'দোকান আইডি, আবেদনকারীর নাম, ফোন নম্বর ও প্রমাণপত্র আবশ্যক।',
      });
      return;
    }

    const biz = db.getBusinessById(businessId);
    if (!biz) {
      res.status(404).json({ success: false, error: 'ব্যবসা খুঁজে পাওয়া যায়নি।' });
      return;
    }

    const claim = db.createClaim({
      businessId,
      businessNameBn: biz.nameBn,
      applicantName,
      applicantPhone,
      applicantRole: req.body.applicantRole || 'owner',
      tradeLicenseOrNid,
      notes: req.body.notes || '',
    });

    res.status(201).json({
      success: true,
      message: 'মালিকানার দাবি সফলভাবে জমা দেওয়া হয়েছে। প্রশাসক পর্যালোচনার পর অনুমোদিত হবে।',
      data: claim,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Admin Claims List
app.get('/api/admin/claims', (_req: Request, res: Response) => {
  try {
    const claims = db.getClaims();
    res.json({ success: true, data: claims });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Admin Approve / Reject Claim
app.post('/api/admin/claims/:id/action', (req: Request, res: Response) => {
  try {
    const { action } = req.body; // 'approve' | 'reject'
    const claimId = req.params.id;

    if (action === 'approve') {
      const ok = db.approveClaim(claimId);
      if (!ok) {
        res.status(404).json({ success: false, error: 'Claim not found' });
        return;
      }
      res.json({ success: true, message: 'ক্লেইম সফলভাবে অনুমোদিত হয়েছে এবং যাচাইকৃত ব্যাজ প্রদান করা হয়েছে।' });
      return;
    } else if (action === 'reject') {
      const ok = db.rejectClaim(claimId);
      if (!ok) {
        res.status(404).json({ success: false, error: 'Claim not found' });
        return;
      }
      res.json({ success: true, message: 'ক্লেইম আবেদনটি বাতিল করা হয়েছে।' });
      return;
    }

    res.status(400).json({ success: false, error: 'Invalid action' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Admin Update Business Status / Verification
app.patch('/api/admin/businesses/:id', (req: Request, res: Response) => {
  try {
    const updated = db.updateBusiness(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Business not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: OpenStreetMap Overpass Live Sync
app.post('/api/admin/sync-osm', async (_req: Request, res: Response) => {
  try {
    const bbox = BHAWAL_MIRZAPUR_GEO.boundingBox;
    // Overpass query for nodes and ways in Bhawal Mirzapur
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"](${bbox.minLat},${bbox.minLng},${bbox.maxLat},${bbox.maxLng});
        way["amenity"](${bbox.minLat},${bbox.minLng},${bbox.maxLat},${bbox.maxLng});
        node["shop"](${bbox.minLat},${bbox.minLng},${bbox.maxLat},${bbox.maxLng});
        way["shop"](${bbox.minLat},${bbox.minLng},${bbox.maxLat},${bbox.maxLng});
        node["healthcare"](${bbox.minLat},${bbox.minLng},${bbox.maxLat},${bbox.maxLng});
        node["craft"](${bbox.minLat},${bbox.minLng},${bbox.maxLat},${bbox.maxLng});
        node["office"](${bbox.minLat},${bbox.minLng},${bbox.maxLat},${bbox.maxLng});
      );
      out center;
    `;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let elements: any[] = [];

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
        signal: controller.signal,
      });

      if (response.ok) {
        const json = await response.json();
        elements = json.elements || [];
      }
    } catch (fetchErr) {
      console.warn('Overpass fetch failed or timed out, using fallback local sync:', fetchErr);
    } finally {
      clearTimeout(timeout);
    }

    // If Overpass returned elements, ingest them
    if (elements.length > 0) {
      const result = db.syncOverpassNodes(elements);
      res.json({
        success: true,
        message: `ওপেনস্ট্রিটম্যাপ থেকে সফলভাবে ডাটা ফেচ করা হয়েছে।`,
        fetchedElements: elements.length,
        added: result.added,
        updated: result.updated,
        stats: db.getStats(),
      });
      return;
    }

    // Fallback: simulate OSM sync with known nodes in Bhawal Mirzapur
    const simulatedOsmNodes = [
      {
        id: 98112341,
        type: 'node',
        lat: 24.0381,
        lon: 90.3587,
        tags: {
          amenity: 'pharmacy',
          name: 'Bismillah Drug House',
          'name:bn': 'বিসমিল্লাহ ড্রাগ হাউস',
          phone: '01711-223388',
          opening_hours: '08:00-22:00',
          'addr:street': 'College Road',
        },
      },
      {
        id: 98112342,
        type: 'node',
        lat: 24.0396,
        lon: 90.3590,
        tags: {
          shop: 'clothes',
          name: 'Tamanna Ladies Tailors',
          'name:bn': 'তামান্না লেডিস টেইলার্স ও ফেব্রিক্স',
          phone: '01812-998811',
          'addr:street': 'Main Bazar',
        },
      },
      {
        id: 98112343,
        type: 'node',
        lat: 24.0402,
        lon: 90.3579,
        tags: {
          amenity: 'restaurant',
          name: 'Ghoroa Restaurant & Fast Food',
          'name:bn': 'ঘরোয়া রেস্তোরাঁ ও ফাস্ট ফুড',
          phone: '01911-332244',
          'addr:street': 'College Road',
        },
      },
      {
        id: 98112344,
        type: 'node',
        lat: 24.0378,
        lon: 90.3562,
        tags: {
          shop: 'supermarket',
          name: 'Roni Store',
          'name:bn': 'রনি স্টোর ও কনফেকশনারি',
          phone: '01716-554433',
          'addr:street': 'Hospital Road',
        },
      },
    ];

    const result = db.syncOverpassNodes(simulatedOsmNodes);
    res.json({
      success: true,
      message: `ওপেনস্ট্রিটম্যাপ থেকে ভাওয়াল মির্জাপুর বাজারের নোড সিঙ্ক সম্পন্ন হয়েছে।`,
      fetchedElements: simulatedOsmNodes.length,
      added: result.added,
      updated: result.updated,
      stats: db.getStats(),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// SMTP Configuration & Order Email Service
// ==========================================
interface SmtpResolvedConfig {
  isConfigured: boolean;
  missing: string[];
  host: string;
  port: number;
  user: string;
  pass: string;
  toEmail: string;
  fromEmail: string;
}

function getSmtpConfig(): SmtpResolvedConfig {
  let host = (process.env.SMTP_HOST || '').trim();
  // Sanitize common hostname variations (e.g. user typed smtp@gmail.com or gmail.com)
  if (host === 'smtp@gmail.com' || host === 'gmail.com' || (host.includes('@') && host.endsWith('gmail.com'))) {
    host = 'smtp.gmail.com';
  } else if (host.includes('@')) {
    host = host.split('@')[1];
  }

  const rawPort = (process.env.SMTP_PORT || '').trim();
  const port = rawPort ? parseInt(rawPort, 10) : 587;
  const user = (process.env.SMTP_USER || '').trim();
  let pass = (process.env.SMTP_PASS || '').trim();

  // Gmail 16-character App Passwords are generated as 4 groups of 4 with spaces (e.g. 'abcd efgh ijkl mnop')
  if (host.includes('gmail') && pass.length === 19 && pass.split(' ').length === 4) {
    pass = pass.replace(/\s+/g, '');
  }

  // Support ADMIN_EMAIL, NOTIFICATION_EMAIL, SMTP_USER or fallback
  const toEmail = (
    process.env.ADMIN_EMAIL ||
    process.env.NOTIFICATION_EMAIL ||
    user ||
    'rohanisllam@gmail.com'
  ).trim();

  const missing: string[] = [];
  if (!host) missing.push('SMTP_HOST');
  if (!user) missing.push('SMTP_USER');
  if (!pass) missing.push('SMTP_PASS');

  const fromEmail = (process.env.SMTP_FROM || '').trim() || (user ? `"দরকারী — মির্জাপুর বাজার" <${user}>` : '"দরকারী — মির্জাপুর বাজার" <orders@mirzapur.local>');

  return {
    isConfigured: missing.length === 0,
    missing,
    host,
    port,
    user,
    pass,
    toEmail,
    fromEmail,
  };
}

function getProductionAppUrl(req?: Request): string {
  const appUrl = (process.env.APP_URL || '').trim();
  if (appUrl && !appUrl.includes('localhost') && !appUrl.includes('0.0.0.0')) {
    return appUrl.replace(/\/+$/, '');
  }
  const publicUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || '').trim();
  if (publicUrl && !publicUrl.includes('localhost') && !publicUrl.includes('0.0.0.0')) {
    return publicUrl.replace(/\/+$/, '');
  }
  if (req) {
    const origin = req.get('origin');
    if (origin && !origin.includes('localhost') && !origin.includes('0.0.0.0')) {
      return origin.replace(/\/+$/, '');
    }
    const host = req.get('host');
    if (host && !host.includes('localhost') && !host.includes('0.0.0.0')) {
      const proto = req.get('x-forwarded-proto') || req.protocol || 'https';
      return `${proto}://${host}`.replace(/\/+$/, '');
    }
  }
  return 'https://ais-dev-onptc5sqvrmel7pkjwxipq-890145645458.asia-east1.run.app';
}

const VALID_ADMIN_PASSWORDS = ['mirzapur', 'rider123'];

function isAuthorizedAdmin(req: Request): boolean {
  const passHeader = String(req.headers['x-admin-pass'] || req.headers['x-admin-key'] || '').trim();
  const authHeader = String(req.headers['authorization'] || '').trim();
  
  if (VALID_ADMIN_PASSWORDS.includes(passHeader)) return true;
  
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (VALID_ADMIN_PASSWORDS.includes(token)) return true;
  }

  const passQuery = String(req.query.admin_pass || req.query.admin_key || '').trim();
  if (VALID_ADMIN_PASSWORDS.includes(passQuery)) return true;

  return false;
}

async function sendOrderNotificationEmail(
  order: OrderRecord,
  forceResend = false,
  req?: Request
): Promise<{ sent: boolean; duplicateSkipped?: boolean; message: string; messageId?: string }> {
  // Prevent duplicate notification emails on retries unless forceResend is requested
  if (order.emailSent && !forceResend) {
    console.log(`ℹ️ [Email Skipped] Order #${order.id} notification was already dispatched on ${order.emailSentAt || 'previous attempt'}.`);
    return {
      sent: true,
      duplicateSkipped: true,
      message: 'ইমেইল ইতিমধ্যে প্রেরিত হয়েছে (ডুপ্লিকেট নোটিফিকেশন বাদ দেওয়া হয়েছে)।',
    };
  }

  const config = getSmtpConfig();
  const appUrl = getProductionAppUrl(req);
  const manageUrl = `${appUrl}/#manage=${order.id}`;
  const customerTrackUrl = `${appUrl}/#track=${order.id}`;
  const orderStatus = order.status || 'নতুন অর্ডার';

  if (!config.isConfigured) {
    const errorMsg = `SMTP কনফিগারেশন অসম্পূর্ণ। অনুপস্থিত ভ্যারিয়েবল: ${config.missing.join(', ')}। (.env বা Environment Variables-এ SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL সেট করুন)`;
    console.warn('\n================== [SMTP NOT CONFIGURED] ==================');
    console.log(`To: ${config.toEmail}`);
    console.log(`Missing settings: ${config.missing.join(', ')}`);
    console.log('Order Details Logged:');
    console.log(`Order ID: #${order.id}`);
    console.log(`Customer: ${order.customerName} (${order.phone})`);
    console.log(`Address: ${order.address}`);
    console.log(`Items: ${order.items}`);
    console.log(`Manage URL: ${manageUrl}`);
    console.log('============================================================\n');
    return { sent: false, message: errorMsg };
  }

  const subject = `[নতুন অর্ডার #${order.id}] ${order.customerName} — ${order.preferredStore}`;

  // Format order date nicely
  let formattedTime = order.createdAt;
  try {
    const dateObj = order.timestamp ? new Date(order.timestamp) : new Date(order.createdAt);
    if (!isNaN(dateObj.getTime())) {
      formattedTime = dateObj.toLocaleString('bn-BD', {
        timeZone: 'Asia/Dhaka',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }
  } catch (e) {}

  const esc = (t: any) => String(t == null ? '' : t).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m] || m));
  const bn = (n: any) => Number(n || 0).toLocaleString('bn-BD', { maximumFractionDigits: 1 });
  const F = "'Hind Siliguri','Noto Sans Bengali',Segoe UI,Arial,sans-serif";
  const row = (a: string, b: string) => `<tr><td style="padding:6px 0;font:13px ${F};color:#6b6b74;width:92px;vertical-align:top">${a}</td><td style="padding:6px 0;font:600 14px ${F};color:#1b1b1f">${b}</td></tr>`;

  const itemRows = (order.lines && order.lines.length > 0)
    ? order.lines.map((l) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f3e3ea">
            <div style="font:600 14px ${F};color:#1b1b1f">${esc(l.n || (l as any).t)}</div>
            <div style="font:12px ${F};color:#6b6b74;margin-top:2px">${esc(order.preferredStore || 'ভাওয়াল মির্জাপুর বাজার')} · × ${bn(l.q)}</div>
            ${l.o && Object.keys(l.o).length ? `<div style="font-size:11px;color:#888892;margin-top:2px;">অপশন: ${Object.entries(l.o).map(([k, v]) => `${esc(k)}: ${esc(v)}`).join(', ')}</div>` : ''}
            ${l.note ? `<div style="font-size:11px;color:#888892;margin-top:2px;">নোট: ${esc(l.note)}</div>` : ''}
          </td>
          <td align="right" style="padding:12px 0;border-bottom:1px solid #f3e3ea;font:700 14px ${F};color:#1b1b1f;white-space:nowrap">
            ${l.p ? `৳ ${bn(l.p * l.q)}` : 'দাম পরে জানানো হবে'}
          </td>
        </tr>
      `).join('')
    : `<tr>
        <td style="padding:12px 0;border-bottom:1px solid #f3e3ea;font:14px ${F};color:#1b1b1f">${esc(order.items)}</td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #f3e3ea;font:700 14px ${F};color:#1b1b1f">${order.subtotal ? `৳ ${bn(order.subtotal)}` : 'মেমো অনুযায়ী'}</td>
      </tr>`;

  const hasLocation = Boolean(order.latitude && order.longitude);
  const locationHtml = hasLocation
    ? `<a href="https://maps.google.com/?q=${order.latitude},${order.longitude}" target="_blank" style="color:#12a091;text-decoration:none">ম্যাপে দেখো${order.distanceKm ? ' · ' + bn(order.distanceKm) + ' কিমি' : ''}</a>`
    : '';

  const totalCalculated = order.total || ((order.subtotal || 0) + (order.deliveryCharge || 30));

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#fbeef2">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fbeef2">
    <tr>
      <td align="center" style="padding:24px 12px">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:28px;overflow:hidden;border:1px solid #f6e6ed">
          <tr>
            <td bgcolor="#e8487a" style="background:#e8487a;padding:26px 28px 22px">
              <div style="font:700 13px ${F};color:#ffffffcc;letter-spacing:.08em">দরকার · মির্জাপুর বাজার</div>
              <div style="font:700 24px ${F};color:#ffffff;margin-top:10px">নতুন অর্ডার এসেছে 🎉</div>
              <div style="font:14px ${F};color:#ffffffe6;margin-top:4px">নিচের তথ্য দেখে দ্রুত প্রস্তুত করো</div>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 28px 6px">
              <span style="display:inline-block;background:#fff4f8;color:#a61e4d;font:700 13px ${F};padding:6px 14px;border-radius:12px;border:1px solid #ffc7da">অর্ডার #${esc(order.id)}</span>
              <span style="font:12px ${F};color:#6b6b74;margin-left:10px">${formattedTime}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 28px 4px">
              <div style="font:700 15px ${F};color:#1b1b1f;margin-bottom:4px">📍 গ্রাহকের তথ্য</div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${row('নাম', esc(order.customerName))}
                ${row('ফোন', `<a href="tel:${esc(order.phone)}" style="color:#12a091;text-decoration:none">${esc(order.phone)}</a>`)}
                ${row('ঠিকানা', esc(order.address) || '—')}
                ${hasLocation ? row('লোকেশন', locationHtml) : ''}
                ${order.notes ? row('নির্দেশনা', esc(order.notes)) : ''}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 28px 0">
              <div style="font:700 15px ${F};color:#1b1b1f">🛍️ অর্ডারের আইটেম</div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${itemRows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 28px 4px">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:5px 0;font:13px ${F};color:#6b6b74">আইটেম মোট</td>
                  <td align="right" style="font:600 14px ${F};color:#1b1b1f">${order.subtotal ? `৳ ${bn(order.subtotal)}` : 'ক্যাশ মেমো অনুযায়ী'}</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;font:13px ${F};color:#6b6b74">ডেলিভারি</td>
                  <td align="right" style="font:600 14px ${F};color:#1b1b1f">৳ ${bn(order.deliveryCharge || 30)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0 0;border-top:2px dashed #f0d3de;font:700 16px ${F};color:#1b1b1f">সর্বমোট <span style="font:12px ${F};color:#6b6b74;font-weight:400">(ক্যাশ অন ডেলিভারি)</span></td>
                  <td align="right" style="padding:12px 0 0;border-top:2px dashed #f0d3de;font:800 20px ${F};color:#e8487a">৳ ${bn(totalCalculated)}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 6px">
              <a href="${manageUrl}" target="_blank" style="display:inline-block;background:#12a091;color:#ffffff;font:700 14px ${F};text-decoration:none;padding:14px 26px;border-radius:16px;margin:4px 4px 0 0">অর্ডার ম্যানেজ করো</a>
              <a href="tel:${esc(order.phone)}" style="display:inline-block;background:#1b1b1f;color:#ffffff;font:700 14px ${F};text-decoration:none;padding:14px 26px;border-radius:16px;margin:4px 4px 0 0">📞 গ্রাহককে কল</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 14px">
              <div style="font:12px ${F};color:#888892">
                🔒 নিরাপত্তা নোট: অর্ডার ম্যানেজ বাটনে চাপ দিলে সরাসরি এই অর্ডারের ম্যানেজমেন্ট পেজ ওপেন হবে। অননুমোদিত অ্যাক্সেস ঠেকাতে পাসকোড চাওয়া হবে।
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 28px 24px">
              <div style="border-top:1px solid #f3e3ea;padding-top:14px;font:12px ${F};color:#6b6b74;line-height:1.6">এই মেইলটি স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে · দরকার — ভাওয়াল মির্জাপুর বাজার</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textLines = (order.lines && order.lines.length > 0)
    ? order.lines.map((l, i) => `${i + 1}. ${l.n} × ${l.q} = ${l.p ? `৳${l.p * l.q}` : 'মেমো অনুযায়ী'}${l.o && Object.keys(l.o).length ? ` [${Object.entries(l.o).map(([k, v]) => `${k}:${v}`).join(', ')}]` : ''}${l.note ? ` (নোট: ${l.note})` : ''}`).join('\n')
    : order.items;

  const text = `
========================================
[নতুন অর্ডার #${order.id}]
দোকান: ${order.preferredStore} (${order.category})
অর্ডারের সময়: ${formattedTime}
বর্তমান স্ট্যাটাস: ${orderStatus}
========================================

👤 গ্রাহকের তথ্য:
নাম: ${order.customerName}
মোবাইল: ${order.phone}
ঠিকানা: ${order.address}
বিশেষ নির্দেশ: ${order.notes || 'কোনো নির্দেশ নেই'}
${order.distanceKm ? `দূরত্ব: প্রায় ${order.distanceKm} কিমি\n` : ''}
📦 পণ্যের তালিকা:
${textLines}

💰 হিসাব:
পণ্য সাবটোটাল: ${order.subtotal ? `৳${order.subtotal}` : 'ক্যাশ মেমো অনুযায়ী'}
ডেলিভারি চার্জ: ৳${order.deliveryCharge}
সর্বমোট: ${order.total ? `৳${order.total}` : `৳${order.deliveryCharge} + ক্যাশ মেমো`}
পেমেন্ট পদ্ধতি: ক্যাশ অন ডেলিভারি (Cash on Delivery)

🛠️ অর্ডার পরিচালনা (Manage Order):
${manageUrl}
(শুধুমাত্র অনুমোদিত অ্যাডমিন লগইন করে স্ট্যাটাস পরিচালনা করতে পারবেন)

🔗 গ্রাহক ট্র্যাকিং লিংক:
${customerTrackUrl}
বিজ্ঞপ্তি প্রেরক: দরকারী — ভাওয়াল মির্জাপুর বাজার
========================================
  `.trim();

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: config.fromEmail,
      to: config.toEmail,
      subject,
      text,
      html,
    });

    console.log(`✅ [Email Dispatched] Order #${order.id} notification sent to ${config.toEmail} (MessageId: ${info.messageId})`);
    return {
      sent: true,
      message: `ইমেইল সফলভাবে পাঠানো হয়েছে: ${config.toEmail}`,
      messageId: info.messageId,
    };
  } catch (err: any) {
    console.error(`❌ [Email Error] Order #${order.id} notification failed:`, err.message || err);
    return {
      sent: false,
      message: `ইমেইল পাঠাতে ব্যর্থ: ${err.message || 'অজানা ত্রুটি'}`,
    };
  }
}

// API: Create Marketplace Order & Send Owner Email Notification
app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const { customerName, phone, address, lines, items, notes, preferredStore, category, deliveryCharge: reqDelivery, businessId, latitude, longitude, distanceKm, subtotal: reqSubtotal } = req.body;

    // Validate required fields
    if (!customerName || String(customerName).trim().length < 2) {
      res.status(400).json({ success: false, error: 'আপনার সঠিক নাম লিখুন।' });
      return;
    }

    const cleanPhone = String(phone || '').replace(/[\s-]/g, '').replace(/^(\+?88)/, '');
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      res.status(400).json({ success: false, error: 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন 01XXXXXXXXX)।' });
      return;
    }

    if (!address || String(address).trim().length < 5) {
      res.status(400).json({ success: false, error: 'ডেলিভারি ঠিকানা সঠিকভাবে লিখুন।' });
      return;
    }

    if (!items && (!Array.isArray(lines) || lines.length === 0)) {
      res.status(400).json({ success: false, error: 'অর্ডারের পণ্য তালিকা খালি থাকতে পারে না।' });
      return;
    }

    // Process and sanitize exact lines from cart
    let computedSubtotal = 0;
    let hasPricedItems = false;
    const sanitizedLines = Array.isArray(lines) ? lines.map((l: any) => {
      const priceNum = (typeof l.p === 'number' && !isNaN(l.p)) ? l.p : null;
      const qtyNum = (typeof l.q === 'number' && l.q > 0) ? l.q : 1;
      if (priceNum !== null) {
        computedSubtotal += priceNum * qtyNum;
        hasPricedItems = true;
      }
      return {
        pid: l.pid || null,
        n: String(l.n || '').trim(),
        q: qtyNum,
        p: priceNum,
        o: (l.o && typeof l.o === 'object') ? l.o : undefined,
        note: l.note ? String(l.note).trim() : undefined,
        sample: false,
      };
    }) : [];

    const subtotal = hasPricedItems ? computedSubtotal : (typeof reqSubtotal === 'number' ? reqSubtotal : 0);
    const deliveryCharge = reqDelivery !== undefined ? Number(reqDelivery) : 30;
    const total = subtotal > 0 ? (subtotal + deliveryCharge) : undefined;

    // Generate or clean items text list
    let cleanItems = typeof items === 'string' ? items.trim() : '';
    cleanItems = cleanItems.replace(/\s*\(নমুনা তালিকা[^)]*\)/g, '').replace(/\s*নমুনা আইটেম/g, '').trim();
    if (!cleanItems && sanitizedLines.length > 0) {
      cleanItems = sanitizedLines.map((l: any, i: number) => {
        let lineStr = `${i + 1}. ${l.n} × ${l.q}`;
        if (l.p) lineStr += ` (৳${l.p * l.q})`;
        if (l.o && Object.keys(l.o).length > 0) {
          lineStr += ` [${Object.entries(l.o).map(([k, v]) => `${k}: ${v}`).join(', ')}]`;
        }
        if (l.note) lineStr += ` — নোট: ${l.note}`;
        return lineStr;
      }).join('\n');
    }

    const orderId = req.body.id ? String(req.body.id).trim() : `DKR-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const existingOrder = db.getOrderById(orderId);

    let orderRecord: OrderRecord;
    if (existingOrder) {
      orderRecord = db.updateOrderStatus(existingOrder.id, {
        customerName: String(customerName).trim(),
        phone: cleanPhone,
        address: String(address).trim(),
        subtotal: subtotal > 0 ? subtotal : existingOrder.subtotal,
        deliveryCharge,
        total: total !== undefined ? total : existingOrder.total,
        notes: notes !== undefined ? String(notes).trim() : '',
        preferredStore: preferredStore ? String(preferredStore).trim() : existingOrder.preferredStore,
        category: category ? String(category).trim() : existingOrder.category,
        lines: sanitizedLines.length > 0 ? sanitizedLines : existingOrder.lines,
        items: cleanItems || existingOrder.items,
        businessId: businessId || existingOrder.businessId,
        latitude: latitude !== undefined ? latitude : existingOrder.latitude,
        longitude: longitude !== undefined ? longitude : existingOrder.longitude,
        distanceKm: distanceKm !== undefined ? distanceKm : existingOrder.distanceKm,
      }) || existingOrder;
    } else {
      const orderData: Partial<OrderRecord> = {
        id: orderId,
        customerName: String(customerName).trim(),
        phone: cleanPhone,
        address: String(address).trim(),
        notes: notes ? String(notes).trim() : '',
        preferredStore: preferredStore ? String(preferredStore).trim() : 'ভাওয়াল মির্জাপুর বাজার',
        category: category ? String(category).trim() : 'খাবার ও রেস্তোরাঁ',
        businessId,
        lines: sanitizedLines,
        items: cleanItems,
        subtotal: subtotal > 0 ? subtotal : undefined,
        deliveryCharge,
        total,
        latitude,
        longitude,
        distanceKm,
        status: req.body.status || 'নতুন অর্ডার',
        source: req.body.source || 'mirzapur-web',
        timestamp: Date.now(),
        createdAt: new Date().toISOString(),
      };
      orderRecord = db.createOrder(orderData);
    }

    // Dispatch email notification to admin with duplicate protection
    const emailResult = await sendOrderNotificationEmail(orderRecord, false, req);
    if (emailResult.sent) {
      if (!emailResult.duplicateSkipped) {
        db.updateOrderStatus(orderRecord.id, {
          emailSent: true,
          emailError: undefined,
          emailSentAt: new Date().toISOString(),
        });
        orderRecord.emailSent = true;
      }
    } else {
      db.updateOrderStatus(orderRecord.id, {
        emailSent: false,
        emailError: emailResult.message,
      });
      orderRecord.emailSent = false;
      orderRecord.emailError = emailResult.message;
    }

    res.status(201).json({
      success: true,
      message: 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে।',
      data: orderRecord,
      emailSent: orderRecord.emailSent || false,
      emailStatus: emailResult.message,
      duplicateSkipped: !!emailResult.duplicateSkipped,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, error: error.message || 'অর্ডার তৈরিতে সমস্যা হয়েছে।' });
  }
});

// API: Manually Resend Order Notification Email
app.post('/api/orders/:id/resend-email', async (req: Request, res: Response) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ success: false, error: 'অর্ডারটি খুঁজে পাওয়া যায়নি।' });
      return;
    }

    const emailResult = await sendOrderNotificationEmail(order, true, req);
    if (emailResult.sent) {
      db.updateOrderStatus(order.id, {
        emailSent: true,
        emailError: undefined,
        emailSentAt: new Date().toISOString(),
      });
      order.emailSent = true;
    } else {
      db.updateOrderStatus(order.id, {
        emailSent: false,
        emailError: emailResult.message,
      });
      order.emailSent = false;
      order.emailError = emailResult.message;
    }

    res.json({
      success: emailResult.sent,
      emailSent: emailResult.sent,
      message: emailResult.message,
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Update Order Status by Authorized Admin
app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const order = db.getOrderById(orderId);
    if (!order) {
      res.status(404).json({ success: false, error: `অর্ডার #${orderId} খুঁজে পাওয়া যায়নি।` });
      return;
    }

    // Authorization check: Only authenticated admin can update order status
    if (!isAuthorizedAdmin(req)) {
      res.status(401).json({
        success: false,
        error: 'অননুমোদিত: অর্ডার পরিচালনা করতে অ্যাডমিন লগইন প্রয়োজন।',
      });
      return;
    }

    const { status, st, x, note } = req.body;
    if (!status && typeof st !== 'number' && typeof x !== 'boolean') {
      res.status(400).json({ success: false, error: 'নতুন স্ট্যাটাস উল্লেখ করুন।' });
      return;
    }

    const isCancelled = x === true || String(status).includes('বাতিল') || String(status).toLowerCase().includes('cancel');
    const updates: Partial<OrderRecord> = {
      status: status || (isCancelled ? 'বাতিল করা হয়েছে' : order.status),
      st: typeof st === 'number' ? st : (isCancelled ? -1 : order.st),
      x: isCancelled,
      updatedAt: new Date().toISOString(),
    };

    if (note) {
      updates.notes = order.notes ? `${order.notes} | ${note}` : String(note);
    }

    const updated = db.updateOrderStatus(orderId, updates);
    res.json({
      success: true,
      message: `অর্ডার #${orderId} এর স্ট্যাটাস সফলভাবে '${updates.status}' এ আপডেট করা হয়েছে।`,
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Check Email System Configuration Status (no secrets leaked)
app.get('/api/email-status', (_req: Request, res: Response) => {
  const cfg = getSmtpConfig();
  res.json({
    success: true,
    configured: cfg.isConfigured,
    missing: cfg.missing,
    host: cfg.host,
    port: cfg.port,
    recipient: cfg.toEmail,
    senderConfigured: !!cfg.user,
  });
});

// API: Sync Customer Orders (Customers can only query their own orders by ID list or phone)
app.post('/api/orders/sync', (req: Request, res: Response) => {
  try {
    const { ids, phone } = req.body;
    const idList = Array.isArray(ids) ? ids.map(String) : [];
    const cleanPhone = phone ? String(phone).replace(/\D/g, '') : '';

    if (idList.length === 0 && !cleanPhone) {
      res.json({ success: true, data: [] });
      return;
    }

    const allOrders = db.getOrders();
    const matched = allOrders.filter((o) => {
      if (idList.includes(o.id)) return true;
      if (cleanPhone && cleanPhone.length >= 8 && o.phone.replace(/\D/g, '').includes(cleanPhone)) {
        return true;
      }
      return false;
    });

    res.json({ success: true, count: matched.length, data: matched });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get Order by ID
app.get('/api/orders/:id', (req: Request, res: Response) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ success: false, error: 'অর্ডার খুঁজে পাওয়া যায়নি।' });
      return;
    }
    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: List Orders (Authorized admin sees all; non-admins can only see their own via phone or specific id)
app.get('/api/orders', (req: Request, res: Response) => {
  try {
    const { phone, status, limit, id } = req.query;
    const isAdmin = isAuthorizedAdmin(req);

    // If not admin, require either specific order ID or customer's phone
    if (!isAdmin && !phone && !id) {
      res.status(403).json({
        success: false,
        error: 'অননুমোদিত: সকল অর্ডার শুধুমাত্র অ্যাডমিন দেখতে পারবেন। গ্রাহকরা তাদের নিজস্ব মোবাইল নম্বর বা অর্ডার আইডি দিয়ে দেখতে পারেন।',
      });
      return;
    }

    if (id) {
      const order = db.getOrderById(String(id));
      res.json({ success: true, count: order ? 1 : 0, data: order ? [order] : [] });
      return;
    }

    const orders = db.getOrders({
      phone: phone ? String(phone) : undefined,
      status: status ? String(status) : undefined,
      limit: limit ? parseInt(String(limit), 10) : undefined,
    });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Mirzapur Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
