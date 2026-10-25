/**
 * Mirzapur — Bhawal Mirzapur Bazar, Gazipur Local Directory
 * Exact UI Transfer, Robust Back-Navigation, and Comprehensive Local Directory
 * 
 * Google Maps Reference: https://maps.app.goo.gl/oTUTcjqiBMzivnn87
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  BUSINESSES,
  BusinessListing,
  POPULAR_BUSINESS_IDS,
  NEARBY_BUSINESS_IDS,
  HERO_STACK_IDS,
  HERO_FEATURED_ID,
  COLLECTIONS,
  MIRZAPUR_MAP_LOCATION,
} from './data/businesses';
import {
  CATEGORY_LIST,
  IC_PATHS,
  getCategoryPalette,
  getCategoryIconSvg,
  getCategorySceneSvg,
} from './data/categories';
import { BHAWAL_MIRZAPUR_GEO } from './data/geo';

// Bottom Navigation tabs definition
interface NavTab {
  hash: string;
  icon: string;
  label: string;
  tint: string;
}

const NAV_TABS: NavTab[] = [
  { hash: '#/explore', icon: 'home', label: 'Explore', tint: '#FFE3CF' },
  { hash: '#/cats', icon: 'grid', label: 'Categories', tint: '#E8E0FF' },
  { hash: '#/map', icon: 'pin', label: 'Map', tint: '#D8E8FF' },
  { hash: '#/favs', icon: 'heart', label: 'Favorites', tint: '#FFDCE8' },
  { hash: '#/search', icon: 'search', label: 'Search', tint: '#D2F1E2' },
];

export default function App() {
  // Navigation & Routing state
  const [currentRoute, setCurrentRoute] = useState<string>('#/explore');
  const [routeParam, setRouteParam] = useState<string>('');
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [isNavBubMoving, setIsNavBubMoving] = useState<boolean>(false);

  // Application-level navigation history stack to guarantee back button works
  const [lastListRoute, setLastListRoute] = useState<string>('#/explore');
  const scrollPositionsRef = useRef<Record<string, number>>({});

  // Search input state (preserved across navigation)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Active section tab in business detail view
  const [activeDetailSection, setActiveDetailSection] = useState<string>('all');

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('mz-fav');
      return saved ? JSON.parse(saved) : [1, 6, 12, 14, 22];
    } catch {
      return [1, 6, 12, 14, 22];
    }
  });

  // Recently viewed IDs
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('mz-rv');
      return saved ? JSON.parse(saved) : [1, 2, 6, 12];
    } catch {
      return [1, 2, 6, 12];
    }
  });

  // Selected map business ID
  const [selectedMapBizId, setSelectedMapBizId] = useState<number>(1);
  const [mapTab, setMapTab] = useState<'all' | 'fav'>('all');

  // Toast feedback
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 2800);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mz-fav', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Save recently viewed to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mz-rv', JSON.stringify(recentlyViewed));
    } catch {
      // ignore
    }
  }, [recentlyViewed]);

  // Toggle favorite
  const toggleFavorite = useCallback((id: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((x) => x !== id) : [...prev, id];
      showToast(exists ? 'পছন্দ থেকে সরানো হয়েছে' : 'পছন্দের তালিকায় সংরক্ষিত হয়েছে');
      return updated;
    });
  }, [showToast]);

  // Track recently viewed
  const recordView = useCallback((id: number) => {
    setRecentlyViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 10));
  }, []);

  // Programmatic navigate with scroll caching
  const navigate = useCallback((hash: string) => {
    // Record current scroll position before leaving
    const cur = window.location.hash || '#/explore';
    scrollPositionsRef.current[cur] = window.scrollY;

    // If leaving a list view to open a detail view, memorize the list view
    if (!cur.startsWith('#/biz') && hash.startsWith('#/biz')) {
      setLastListRoute(cur);
    }

    window.location.hash = hash;
  }, []);

  // Robust back navigation from business detail view
  const handleDetailBack = useCallback(() => {
    const target = lastListRoute && !lastListRoute.startsWith('#/biz') ? lastListRoute : '#/explore';
    navigate(target);

    // Restore scroll position after view renders
    setTimeout(() => {
      const savedScroll = scrollPositionsRef.current[target] || 0;
      window.scrollTo({ top: savedScroll, behavior: 'instant' });
    }, 40);
  }, [lastListRoute, navigate]);

  // Hash router
  const parseRoute = useCallback(() => {
    const rawHash = window.location.hash || '#/explore';
    const parts = rawHash.split('/');
    const mainSection = parts[1] || 'explore';
    const param = parts[2] ? decodeURIComponent(parts[2]) : '';

    const newRoute = parts[0] + '/' + mainSection;
    setCurrentRoute(newRoute);
    setRouteParam(param);

    // Keep track of list route if we are on a list view
    if (mainSection !== 'biz') {
      setLastListRoute(rawHash);
    }

    // Reset active detail section when opening new detail
    setActiveDetailSection('all');

    // Update bottom nav index
    let tabIndex = 0;
    if (mainSection === 'cats' || mainSection === 'cat') tabIndex = 1;
    else if (mainSection === 'map') tabIndex = 2;
    else if (mainSection === 'favs') tabIndex = 3;
    else if (mainSection === 'search') tabIndex = 4;
    else tabIndex = 0;

    setActiveTabIdx((prev) => {
      if (prev !== tabIndex) {
        setIsNavBubMoving(true);
        setTimeout(() => setIsNavBubMoving(false), 500);
      }
      return tabIndex;
    });

    // Update nav colors
    const activeColor = NAV_TABS[tabIndex]?.tint || '#FFE3CF';
    document.documentElement.style.setProperty('--tint', activeColor);
    const navEl = document.getElementById('nav');
    if (navEl) {
      navEl.style.setProperty('--tint', activeColor);
      navEl.style.setProperty('--i', String(tabIndex));
    }

    // Detail route logic
    if (mainSection === 'biz' && param) {
      const bizId = parseInt(param, 10);
      if (!isNaN(bizId)) {
        recordView(bizId);
      }
      window.scrollTo(0, 0);
    } else if (mainSection === 'map' && param) {
      const bizId = parseInt(param, 10);
      if (!isNaN(bizId)) {
        setSelectedMapBizId(bizId);
      }
    }
  }, [recordView]);

  useEffect(() => {
    parseRoute();
    window.addEventListener('hashchange', parseRoute);
    return () => window.removeEventListener('hashchange', parseRoute);
  }, [parseRoute]);

  // Helper: Find business by ID
  const getBizById = useCallback((id: number): BusinessListing | undefined => {
    return BUSINESSES.find((b) => b.id === id);
  }, []);

  // Filtered businesses for search (across names, categories, and item menus)
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return BUSINESSES;
    return BUSINESSES.filter((b) => {
      const inN = b.n.toLowerCase().includes(q);
      const inBn = b.nameBn.toLowerCase().includes(q);
      const inC = b.c.toLowerCase().includes(q);
      const inCBn = b.categoryBn.toLowerCase().includes(q);
      const inL = b.l.toLowerCase().includes(q);
      const inSections = b.sections?.some((sec) =>
        sec.items.some(
          (it) =>
            it.name.toLowerCase().includes(q) ||
            (it.nameBn && it.nameBn.toLowerCase().includes(q))
        )
      );
      const inItems = (b.m as any)?.some((it: any) => it[0]?.toLowerCase().includes(q));
      return inN || inBn || inC || inCBn || inL || inSections || inItems;
    });
  }, [searchQuery]);

  // Render SVG helper
  const renderIcon = (key: string, size = 22, className = '') => {
    const path = IC_PATHS[key] || IC_PATHS['home'];
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    );
  };

  // Business Card Component
  const renderCard = (b: BusinessListing, extraClass = '') => {
    const isFav = favorites.includes(b.id);
    const [a, bColor] = getCategoryPalette(b.c);
    const isRestaurant = b.c === 'Restaurants';

    return (
      <div
        key={b.id}
        className={`card ${extraClass}`}
        style={{ cursor: 'pointer' }}
        tabIndex={0}
        role="link"
        onClick={() => navigate(`#/biz/${b.id}`)}
      >
        <div className="im" style={{ '--a': a, '--b': bColor } as React.CSSProperties}>
          {/* Authentic Real Photograph */}
          <img
            src={b.photo}
            alt={b.n}
            loading="lazy"
            className="im-photo"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="im-overlay" />

          {/* Subtle steam indicator for hot food / restaurants */}
          {isRestaurant && (
            <div className="absolute top-3 left-3 z-10 flex gap-1 items-end pointer-events-none opacity-80">
              <span className="w-1 h-3 rounded-full bg-white/70 steam-float-1" />
              <span className="w-1 h-4 rounded-full bg-white/60 steam-float-2" />
              <span className="w-1 h-3.5 rounded-full bg-white/70 steam-float-3" />
            </div>
          )}

          {/* 3D Category Accent Emblem in bottom right */}
          <span
            className="g"
            dangerouslySetInnerHTML={{ __html: getCategoryIconSvg(b.c, 36) }}
          />

          {/* Glass Category Tag */}
          <span className="glass">{b.c}</span>
        </div>

        {/* Favorite Heart Button */}
        <span
          className={`fav ${isFav ? 'on' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Favorite"
          onClick={(e) => toggleFavorite(b.id, e)}
        >
          {renderIcon('heart', 18)}
        </span>

        {/* Card Body */}
        <div className="bd">
          <div className="flex-1 min-w-0 pr-1">
            <div className="nm truncate text-[#1C1B20]">{b.n}</div>
            <div className="sub truncate text-xs text-[#8C8A94] mt-0.5">
              {b.nameBn.split(' ')[0]} • {b.l.split(',')[0]}
            </div>
            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
              {b.verificationStatus === 'verified' && (
                <span className="badge-verified">✓ যাচাইকৃত</span>
              )}
              {b.verificationStatus === 'needs-verification' && (
                <span className="badge-needs-verification">যাচাইাধীন</span>
              )}
              {b.verificationStatus === 'sample' && (
                <span className="badge-sample">নমুনা এন্ট্রি</span>
              )}
            </div>
          </div>
          {b.r && (
            <span className="rt shrink-0">
              {renderIcon('star', 13)}
              {b.r}
            </span>
          )}
        </div>
      </div>
    );
  };

  // Fixed Category Scroll Carousel Row (No text collisions, centered icons, readable wrapped labels)
  const renderCategoryRow = (selectedCat?: string) => {
    return (
      <div className="cats" role="region" aria-label="Business Categories">
        {CATEGORY_LIST.map((cat) => {
          const isOn = selectedCat === cat.id;
          const [a, b] = cat.colors;
          return (
            <button
              key={cat.id}
              className={`cat ${isOn ? 'on' : ''}`}
              style={{ '--a': a, '--b': b } as React.CSSProperties}
              onClick={() => navigate(`#/cat/${cat.id}`)}
              aria-label={cat.name}
              title={cat.name}
            >
              <i dangerouslySetInnerHTML={{ __html: getCategoryIconSvg(cat.iconKey, 24) }} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // Mini Map SVG Preview in Nearby Strip
  const renderMiniMapSvg = () => (
    <svg className="mp" viewBox="0 0 250 210" preserveAspectRatio="xMidYMid slice">
      <path
        d="M-10 150C60 120 120 160 260 90M70 -10L110 220M170 -10L150 220"
        stroke="#fff"
        strokeWidth="9"
        fill="none"
        opacity=".8"
      />
      <circle cx="95" cy="110" r="9" fill="#FF7A1A" />
      <circle cx="170" cy="70" r="6" fill="#fff" />
      <circle cx="55" cy="60" r="6" fill="#fff" />
      <circle cx="195" cy="150" r="6" fill="#fff" />
    </svg>
  );

  return (
    <div className="min-h-screen text-[#1C1B20] selection:bg-[#FF7A1A]/20 selection:text-[#FF7A1A] relative">
      {/* SVG Gooey Filter for Liquid Nav */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
        </filter>
      </svg>

      {/* Floating Toast Notice */}
      {toast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1C1B20]/95 text-white px-5 py-2.5 rounded-full text-xs font-medium shadow-2xl backdrop-blur-md flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-top-3"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF7A1A]" />
          <span>{toast}</span>
        </aside>
      )}

      {/* Top Header */}
      <header>
        <a
          className="brand"
          href="#/explore"
          onClick={(e) => {
            e.preventDefault();
            navigate('#/explore');
          }}
          aria-label="Mirzapur"
        >
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path d="M12 2.3l8.2 4.6-8.2 4.6-8.2-4.6z" fill="#FFB27A" />
            <path d="M3.5 7.8l8 4.5v9.4l-8-4.5z" fill="#FF7A1A" />
            <path d="M20.5 7.8l-8 4.5v9.4l8-4.5z" fill="#E85D00" />
          </svg>
          <span className="font-semibold text-[17px] tracking-tight">Mirzapur</span>
        </a>

        {/* Real Location Link */}
        <a
          href={MIRZAPUR_MAP_LOCATION}
          target="_blank"
          rel="noopener noreferrer"
          className="loc hover:text-[#FF7A1A] transition-colors"
          title="গুগল ম্যাপে ভাওয়াল মির্জাপুর বাজার দেখুন"
        >
          {renderIcon('pin', 16)}
          <span>Bhawal Mirzapur Bazar</span>
        </a>
      </header>

      {/* Main Content Router View */}
      <main>
        <div id="app" className="in">
          {/* =================================================================
              1. EXPLORE VIEW (#/explore)
              ================================================================= */}
          {currentRoute === '#/explore' && (
            <div>
              {/* Hero2 Banner */}
              <section className="hero2">
                <div className="tx">
                  <a
                    href={MIRZAPUR_MAP_LOCATION}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip hover:bg-white/80 transition-colors"
                  >
                    {renderIcon('pin', 14)}
                    <span>Bhawal Mirzapur Bazar</span>
                  </a>
                  <h1>আপনার এলাকার দোকান</h1>
                  <label
                    className="search cursor-pointer"
                    onClick={() => navigate('#/search')}
                  >
                    {renderIcon('search', 20)}
                    <input
                      id="q0"
                      readOnly
                      placeholder="দোকান, খাবার বা পণ্য খুঁজুন"
                      onFocus={() => navigate('#/search')}
                    />
                    <span className="go">{renderIcon('chev', 18)}</span>
                  </label>
                </div>

                {/* Stack of Cards on Right Desktop */}
                <div className="stack">
                  {HERO_STACK_IDS.map((id) => {
                    const b = getBizById(id);
                    if (!b) return null;
                    const [a, bColor] = getCategoryPalette(b.c);
                    return (
                      <div
                        key={id}
                        className="im"
                        style={{ '--a': a, '--b': bColor } as React.CSSProperties}
                        onClick={() => navigate(`#/biz/${b.id}`)}
                      >
                        <img src={b.photo} alt={b.n} className="im-photo" />
                        <div className="im-overlay" />
                        <span
                          className="sc"
                          dangerouslySetInnerHTML={{ __html: getCategorySceneSvg(b.c) }}
                        />
                      </div>
                    );
                  })}

                  {/* Floating Featured Business Pill */}
                  {(() => {
                    const fb = getBizById(HERO_FEATURED_ID);
                    if (!fb) return null;
                    return (
                      <button className="fc" onClick={() => navigate(`#/biz/${fb.id}`)}>
                        <i>{renderIcon('star', 16)}</i>
                        <div>
                          <b>{fb.n}</b>
                          <small>{fb.categoryBn}</small>
                        </div>
                      </button>
                    );
                  })()}
                </div>
              </section>

              {/* Horizontal Category Carousel (Fixed labels, no collisions) */}
              {renderCategoryRow()}

              {/* Popular Section (Mosaic Layout) */}
              <div className="sec">
                <h2>Popular</h2>
                <button
                  onClick={() => navigate('#/cat/Restaurants')}
                  className="hover:text-[#FF7A1A]"
                >
                  সব দেখুন
                </button>
              </div>

              <div className="mos">
                {POPULAR_BUSINESS_IDS.map((id) => {
                  const b = getBizById(id);
                  return b ? renderCard(b) : null;
                })}
              </div>

              {/* Nearby Section (Horizontal Snap Strip with Mini Map Card) */}
              <div className="sec">
                <h2>Nearby</h2>
                <button onClick={() => navigate('#/map')} className="hover:text-[#FF7A1A]">
                  ম্যাপে দেখুন
                </button>
              </div>

              <div className="strip">
                <button
                  className="mini"
                  onClick={() => navigate('#/map')}
                  aria-label="Map view"
                >
                  {renderMiniMapSvg()}
                  <b>Map</b>
                  <small>কাছের দোকান</small>
                </button>
                {NEARBY_BUSINESS_IDS.map((id) => {
                  const b = getBizById(id);
                  return b ? renderCard(b) : null;
                })}
              </div>

              {/* Collections Cards */}
              <div className="sec">
                <h2>Collections</h2>
              </div>
              <div className="col3">
                {COLLECTIONS.map((col, idx) => {
                  const count = BUSINESSES.filter((b) => col.categoryIds.includes(b.c)).length;
                  return (
                    <button
                      key={idx}
                      className="cl"
                      style={
                        {
                          '--a': col.colors[0],
                          '--b': col.colors[1],
                        } as React.CSSProperties
                      }
                      onClick={() => navigate(`#/cat/${col.targetCategory}`)}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getCategoryIconSvg(col.iconKey, 140, 'absolute -right-2 -top-2 opacity-30'),
                        }}
                      />
                      <b>{col.title}</b>
                      <small>{count} টি জায়গা</small>
                    </button>
                  );
                })}
              </div>

              {/* Recently Viewed Strip */}
              {recentlyViewed.length > 0 && (
                <div>
                  <div className="sec">
                    <h2>Recently viewed</h2>
                  </div>
                  <div className="strip">
                    {recentlyViewed.map((id) => {
                      const b = getBizById(id);
                      return b ? renderCard(b) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Footer */}
              <footer className="ft">
                <a
                  className="brand"
                  href="#/explore"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('#/explore');
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path d="M12 2.3l8.2 4.6-8.2 4.6-8.2-4.6z" fill="#FFB27A" />
                    <path d="M3.5 7.8l8 4.5v9.4l-8-4.5z" fill="#FF7A1A" />
                    <path d="M20.5 7.8l-8 4.5v9.4l8-4.5z" fill="#E85D00" />
                  </svg>
                  Mirzapur
                </a>
                <span>নমুনা তথ্য · প্রকৃত দোকানের তথ্য নয়</span>
                <a
                  href={MIRZAPUR_MAP_LOCATION}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF7A1A] transition-colors underline"
                >
                  Bhawal Mirzapur Bazar, Gazipur (Google Maps)
                </a>
              </footer>
            </div>
          )}

          {/* =================================================================
              2. ALL CATEGORIES VIEW (#/cats)
              ================================================================= */}
          {currentRoute === '#/cats' && (
            <div>
              <div className="hd">
                <h1>Categories</h1>
              </div>
              <div className="big-cat" style={{ marginTop: '16px' }}>
                {CATEGORY_LIST.map((cat) => {
                  const count = BUSINESSES.filter((b) => b.c === cat.id).length;
                  const [a, b] = cat.colors;
                  return (
                    <button
                      key={cat.id}
                      className="bc"
                      style={{ '--a': a, '--b': b } as React.CSSProperties}
                      onClick={() => navigate(`#/cat/${cat.id}`)}
                    >
                      <i dangerouslySetInnerHTML={{ __html: getCategoryIconSvg(cat.iconKey, 24) }} />
                      <div>
                        <div className="text-sm font-semibold">{cat.name}</div>
                        <div className="text-xs text-[#1C1B20]/70 font-normal">
                          {cat.nameBn} • {count}টি প্রতিষ্ঠান
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* =================================================================
              3. CATEGORY FILTER VIEW (#/cat/:catId)
              ================================================================= */}
          {currentRoute === '#/cat' && (
            <div>
              {(() => {
                const targetCat = routeParam || 'Restaurants';
                const catMeta = CATEGORY_LIST.find((c) => c.id === targetCat);
                const filtered = BUSINESSES.filter((b) => b.c === targetCat);

                return (
                  <div>
                    <div className="hd">
                      <button
                        className="back"
                        onClick={() => navigate('#/cats')}
                        aria-label="Back to all categories"
                        title="ক্যাটাগরি তালিকায় ফিরুন"
                      >
                        {renderIcon('back', 20)}
                      </button>
                      <div>
                        <h1 style={{ fontSize: '26px', margin: 0 }}>
                          {catMeta?.name || targetCat}
                        </h1>
                        <small className="text-[#8C8A94]">
                          {catMeta?.nameBn} • {filtered.length} টি দোকান
                        </small>
                      </div>
                    </div>

                    {/* Category pill bar */}
                    {renderCategoryRow(targetCat)}

                    {filtered.length > 0 ? (
                      <div className="grid" style={{ marginTop: '16px' }}>
                        {filtered.map((b) => renderCard(b))}
                      </div>
                    ) : (
                      <div className="empty">
                        <i>{renderIcon('heart', 28)}</i>
                        <div>এই ক্যাটাগরিতে এখনো কোনো দোকান অন্তর্ভুক্ত হয়নি।</div>
                        <button className="pill" onClick={() => navigate('#/explore')}>
                          Explore
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* =================================================================
              4. SEARCH VIEW (#/search)
              ================================================================= */}
          {currentRoute === '#/search' && (
            <div>
              <div className="flex items-center gap-3">
                <button
                  className="back"
                  onClick={() => navigate(lastListRoute && !lastListRoute.startsWith('#/biz') ? lastListRoute : '#/explore')}
                  aria-label="Back"
                >
                  {renderIcon('back', 20)}
                </button>
                <h1 className="my-0">Search</h1>
              </div>

              <label className="search mt-3">
                {renderIcon('search', 20)}
                <input
                  ref={searchInputRef}
                  id="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="দোকান, খাবার বা পণ্য খুঁজুন (e.g. কাচ্চি, চাল, Walton, ঔষধ)"
                  autoComplete="off"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[#8C8A94] hover:text-[#1C1B20] px-2 font-bold"
                  >
                    মুছুন
                  </button>
                )}
                <span className="go">{renderIcon('chev', 18)}</span>
              </label>

              {/* Quick Filter Tag Buttons */}
              <div className="flex gap-2 flex-wrap mt-4">
                {[
                  { label: 'কাচ্চি বিরিয়ানি', q: 'Kacchi' },
                  { label: 'Walton প্লাজা', q: 'Walton' },
                  { label: 'সুপারশপ স্বপ্ন', q: 'Shwapno' },
                  { label: 'চালের আড়ত', q: 'Store' },
                  { label: 'সেলুন', q: 'Saloon' },
                  { label: 'পোশাক', q: 'Fasion' },
                  { label: 'ফার্মেসি', q: 'Pharmacy' },
                  { label: 'মিষ্টি ও দই', q: 'Mistannyo' },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSearchQuery(item.q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/70 border border-neutral-200/80 hover:bg-[#1C1B20] hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Search Results Grid */}
              <div id="res" style={{ marginTop: '22px' }}>
                <div className="text-xs text-[#8C8A94] mb-3">
                  {searchResults.length} টি ফলাফল পাওয়া গেছে
                </div>
                {searchResults.length > 0 ? (
                  <div className="grid">
                    {searchResults.map((b) => renderCard(b))}
                  </div>
                ) : (
                  <div className="empty">
                    <i>{renderIcon('search', 28)}</i>
                    <div>“{searchQuery}” দিয়ে কোনো দোকান পাওয়া যায়নি</div>
                    <button className="pill" onClick={() => setSearchQuery('')}>
                      সব দোকান দেখুন
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================================================================
              5. FAVORITES VIEW (#/favs)
              ================================================================= */}
          {currentRoute === '#/favs' && (
            <div>
              <div className="hd">
                <h1>Favorites</h1>
              </div>
              {(() => {
                const favList = BUSINESSES.filter((b) => favorites.includes(b.id));
                if (favList.length > 0) {
                  return (
                    <div className="grid" style={{ marginTop: '14px' }}>
                      {favList.map((b) => renderCard(b))}
                    </div>
                  );
                }
                return (
                  <div className="empty">
                    <i>{renderIcon('heart', 28)}</i>
                    <div>আপনার পছন্দের তালিকায় এখনো কোনো দোকান সংরক্ষিত নেই</div>
                    <button className="pill" onClick={() => navigate('#/explore')}>
                      Explore
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

          {/* =================================================================
              6. BUSINESS DETAIL VIEW (#/biz/:id)
              ================================================================= */}
          {currentRoute === '#/biz' && (
            <div>
              {(() => {
                const bizId = parseInt(routeParam, 10);
                const b = getBizById(bizId);
                if (!b) {
                  return (
                    <div className="empty">
                      <i>{renderIcon('heart', 28)}</i>
                      <div>দোকানটি খুঁজে পাওয়া যায়নি</div>
                      <button className="pill" onClick={() => navigate('#/explore')}>
                        Explore
                      </button>
                    </div>
                  );
                }

                const isFav = favorites.includes(b.id);
                const [a, bColor] = getCategoryPalette(b.c);
                const isRestaurant = b.c === 'Restaurants';

                // Resolve sections
                const allSections = b.sections || [];
                const activeSectionData =
                  activeDetailSection === 'all'
                    ? allSections
                    : allSections.filter((s) => s.title === activeDetailSection);

                return (
                  <div className="det">
                    {/* Hero Image Container */}
                    <div className="hero">
                      <div
                        className="im"
                        style={{ '--a': a, '--b': bColor } as React.CSSProperties}
                      >
                        <img src={b.photo} alt={b.n} className="im-photo" />
                        <div className="im-overlay" />
                        <span
                          className="g"
                          dangerouslySetInnerHTML={{
                            __html: getCategoryIconSvg(b.c, 64),
                          }}
                        />
                      </div>

                      {/* FIXED RELIABLE BACK BUTTON */}
                      <button
                        className="back"
                        onClick={handleDetailBack}
                        aria-label="Back to previous page"
                        title="আগের পাতায় ফিরুন"
                      >
                        {renderIcon('back', 20)}
                      </button>

                      {/* Favorite Button */}
                      <span
                        className={`fav ${isFav ? 'on' : ''}`}
                        role="button"
                        tabIndex={0}
                        aria-label="Favorite"
                        onClick={(e) => toggleFavorite(b.id, e)}
                      >
                        {renderIcon('heart', 18)}
                      </span>
                    </div>

                    {/* Information Panel */}
                    <div className="info">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {b.verificationStatus === 'verified' && (
                          <span className="badge-verified">✓ যাচাইকৃত প্রতিষ্ঠান</span>
                        )}
                        {b.verificationStatus === 'needs-verification' && (
                          <span className="badge-needs-verification">⚠️ অবস্থান যাচাইাধীন (Nearby Road)</span>
                        )}
                        {b.verificationStatus === 'sample' && (
                          <span className="badge-sample">সম্পাদনাযোগ্য নমুনা তথ্য</span>
                        )}
                        <span className="text-xs bg-neutral-100 px-2.5 py-0.5 rounded-full text-neutral-600 font-medium">
                          {b.categoryBn}
                        </span>
                      </div>

                      <h1 className="text-2xl font-bold">{b.n}</h1>
                      <div className="text-base text-neutral-700 font-medium mb-1">
                        {b.nameBn}
                      </div>

                      <div className="sub text-sm text-[#8C8A94]">
                        {b.c} • {b.l}
                        {b.r && (
                          <span className="rt inline-flex ml-2">
                            {renderIcon('star', 13)}
                            {b.r}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {b.desc && (
                        <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                          {b.desc}
                        </p>
                      )}

                      {/* Open Status */}
                      <div className="open">
                        {renderIcon('clock', 18)}
                        <span>
                          {typeof b.hours === 'object' && b.hours ? b.hours.t : (b.hours || 'খোলা আছে · সকাল ৮:০০ - রাত ৯:০০ (সাধারণ বাজার সময়সূচি)')}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="acts">
                        <button
                          className="act"
                          onClick={() => {
                            if (b.phone) {
                              window.location.href = `tel:${b.phone}`;
                            } else {
                              showToast('ফোন নম্বর যাচাই প্রক্রিয়াধীন');
                            }
                          }}
                        >
                          <i>{renderIcon('phone', 22)}</i>
                          <span>{b.phone ? 'Call' : 'ফোন নম্বর'}</span>
                        </button>

                        <a
                          href={b.googleMapsUrl || MIRZAPUR_MAP_LOCATION}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="act"
                        >
                          <i style={{ '--t': '#E8E0FF' } as React.CSSProperties}>
                            {renderIcon('pin', 22)}
                          </i>
                          <span>Directions</span>
                        </a>

                        <button
                          className="act"
                          onClick={() => {
                            if (navigator.share) {
                              navigator
                                .share({
                                  title: b.n,
                                  text: `${b.n} (${b.nameBn}) — ভাওয়াল মির্জাপুর বাজার, গাজীপুর`,
                                  url: window.location.href,
                                })
                                .catch(() => {});
                            } else {
                              navigator.clipboard.writeText(window.location.href);
                              showToast('দোকানের লিংক কপি করা হয়েছে');
                            }
                          }}
                        >
                          <i style={{ '--t': '#D8E8FF' } as React.CSSProperties}>
                            {renderIcon('share', 22)}
                          </i>
                          <span>Share</span>
                        </button>
                      </div>

                      {/* Rich Menu & Products Section */}
                      {allSections.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-neutral-100">
                          <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-bold">
                              {isRestaurant ? 'খাবার মেনু (Food Menu)' : 'পণ্য ও সেবা তালিকা (Products & Services)'}
                            </h2>
                            {b.sampleMenu && (
                              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                নমুনা তালিকা — রেস্তোরাঁ থেকে নিশ্চিত করুন
                              </span>
                            )}
                          </div>

                          {/* Section filter tabs */}
                          {allSections.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-3">
                              <button
                                className={`menu-tab-btn ${activeDetailSection === 'all' ? 'on' : ''}`}
                                onClick={() => setActiveDetailSection('all')}
                              >
                                All ({allSections.reduce((acc, s) => acc + s.items.length, 0)})
                              </button>
                              {allSections.map((sec, idx) => (
                                <button
                                  key={idx}
                                  className={`menu-tab-btn ${activeDetailSection === sec.title ? 'on' : ''}`}
                                  onClick={() => setActiveDetailSection(sec.title)}
                                >
                                  {sec.title} ({sec.items.length})
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Items listing */}
                          <div className="divide-y divide-neutral-100">
                            {activeSectionData.map((sec, sIdx) => (
                              <div key={sIdx} className="py-2">
                                {activeDetailSection === 'all' && (
                                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 pt-2 pb-1">
                                    {sec.title} {sec.titleBn && `• ${sec.titleBn}`}
                                  </div>
                                )}
                                {sec.items.map((item) => (
                                  <div key={item.id} className="menu-item-row">
                                    <div className="flex-1 min-w-0">
                                      <div className="font-semibold text-sm text-neutral-900">
                                        {item.name}
                                      </div>
                                      {item.nameBn && (
                                        <div className="text-xs text-neutral-600 mt-0.5">
                                          {item.nameBn}
                                        </div>
                                      )}
                                      {item.desc && (
                                        <div className="text-xs text-neutral-500 mt-1 leading-relaxed">
                                          {item.desc}
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-right shrink-0">
                                      <span className="font-bold text-[#FF7A1A] text-sm">
                                        {item.price}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Disclaimer Note */}
                      <p className="note">
                        {b.sampleMenu
                          ? 'নমুনা তালিকা ও আনুমানিক মূল্য — স্থানীয় তথ্য নিশ্চিতকরণের ভিত্তিতে আপডেটযোগ্য।'
                          : 'ভাওয়াল মির্জাপুর বাজার, গাজীপুর (Google Maps: maps.app.goo.gl/oTUTcjqiBMzivnn87)'}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* =================================================================
              7. MAP VIEW (#/map)
              ================================================================= */}
          {currentRoute === '#/map' && (
            <div>
              <div className="hd flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Map — ভাওয়াল মির্জাপুর বাজার</h1>
                  <small className="text-[#8C8A94]">
                    গাজীপুর সদর, ঢাকা বিভাগ • ২৩.৯৭°N, ৯০.৩৬°E
                  </small>
                </div>
                <a
                  href={MIRZAPUR_MAP_LOCATION}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill flex items-center gap-1.5 text-xs px-3.5"
                  title="গুগল ম্যাপে আসল লোকেশন দেখুন"
                >
                  {renderIcon('pin', 14)}
                  <span>Google Maps</span>
                </a>
              </div>

              <div className="mp">
                {/* Interactive Vector Map of Bhawal Mirzapur */}
                <div className="map relative">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect width="100" height="100" fill="#F1EEEA" />
                    <rect x="5" y="8" width="26" height="24" rx="6" fill="#E4EFE6" />
                    <rect x="66" y="62" width="28" height="30" rx="8" fill="#DDE8F7" />

                    {/* Turag River flowing along western side */}
                    <path
                      d="M-5 15 C15 35, 10 65, 5 95 L-5 95 Z"
                      fill="#C8E3F8"
                      opacity="0.6"
                    />

                    {/* Mirzapur Main Roads */}
                    <path
                      d="M-5 55 C25 45, 45 60, 70 40 S95 30, 105 25 M30 -5 L42 105 M75 -5 L58 105"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      style={{ strokeWidth: '11px' }}
                    />
                    <path
                      d="M-5 55 C25 45, 45 60, 70 40 S95 30, 105 25 M30 -5 L42 105 M75 -5 L58 105"
                      stroke="#E5DFD7"
                      strokeWidth="1.5"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      style={{ strokeWidth: '5px' }}
                    />

                    {/* Key Landmarks */}
                    {BHAWAL_MIRZAPUR_GEO.landmarks.map((lm, idx) => (
                      <g key={idx}>
                        <circle
                          cx={((lm.lng - 90.354) / (90.362 - 90.354)) * 80 + 10}
                          cy={((24.044 - lm.lat) / (24.044 - 24.035)) * 80 + 10}
                          r="1.8"
                          fill="#8C8A94"
                        />
                      </g>
                    ))}
                  </svg>

                  {/* Pins for Directory Businesses */}
                  {BUSINESSES.map((b) => {
                    const isSelected = b.id === selectedMapBizId;
                    return (
                      <button
                        key={b.id}
                        className={`pin ${isSelected ? 'on' : ''}`}
                        style={{
                          left: `${b.x}%`,
                          top: `${b.y}%`,
                        }}
                        onClick={() => setSelectedMapBizId(b.id)}
                        aria-label={b.n}
                        title={`${b.n} (${b.categoryBn})`}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: getCategoryIconSvg(b.c, 18),
                          }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Right Map Details & Listing Column */}
                <div>
                  <div className="tabs" id="tabs">
                    <button
                      className={mapTab === 'all' ? 'on' : ''}
                      onClick={() => setMapTab('all')}
                    >
                      Nearby ({BUSINESSES.length})
                    </button>
                    <button
                      className={mapTab === 'fav' ? 'on' : ''}
                      onClick={() => setMapTab('fav')}
                    >
                      Saved ({favorites.length})
                    </button>
                  </div>

                  <div className="list" id="lst">
                    {(() => {
                      const displayedList =
                        mapTab === 'fav'
                          ? BUSINESSES.filter((b) => favorites.includes(b.id))
                          : BUSINESSES;

                      if (displayedList.length === 0) {
                        return (
                          <div className="empty">
                            <i>{renderIcon('heart', 24)}</i>
                            <div>কোনো সংরক্ষিত দোকান পাওয়া যায়নি</div>
                          </div>
                        );
                      }

                      return displayedList.map((b) => {
                        const isSelected = b.id === selectedMapBizId;
                        const [a, bColor] = getCategoryPalette(b.c);
                        return (
                          <button
                            key={b.id}
                            className={`li ${isSelected ? 'on' : ''}`}
                            onClick={() => {
                              if (isSelected) {
                                navigate(`#/biz/${b.id}`);
                              } else {
                                setSelectedMapBizId(b.id);
                              }
                            }}
                          >
                            <i
                              style={{
                                '--a': a,
                                '--b': bColor,
                              } as React.CSSProperties}
                              dangerouslySetInnerHTML={{
                                __html: getCategoryIconSvg(b.c, 20),
                              }}
                            />
                            <div>
                              <div className="nm font-semibold text-sm">{b.n}</div>
                              <div className="sub text-xs text-[#8C8A94]">
                                {b.c} • {b.nameBn.split(' ')[0]}
                              </div>
                            </div>
                            {renderIcon('chev', 18)}
                          </button>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Liquid Gooey Bottom Navigation Dock */}
      <nav id="nav" aria-label="Main">
        <div className="gl">
          <div className="goo">
            <i className="bar" />
            <i className={`bub ${isNavBubMoving ? 'mv' : ''}`} />
          </div>
        </div>

        <div className="it" id="items">
          {NAV_TABS.map((tab, idx) => {
            const isTabActive = activeTabIdx === idx;
            return (
              <button
                key={tab.hash}
                className={isTabActive ? 'on' : ''}
                onClick={() => navigate(tab.hash)}
                aria-label={tab.label}
              >
                {renderIcon(tab.icon, 24)}
                <em>{tab.label}</em>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
