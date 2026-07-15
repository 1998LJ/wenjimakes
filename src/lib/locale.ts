export type Locale = 'zh' | 'en';

function isEnglishPath(pathname: string): boolean {
  return pathname === '/en' || pathname.startsWith('/en/');
}

export function getLocale(pathname: string): Locale {
  return isEnglishPath(pathname) ? 'en' : 'zh';
}

export function switchLocalePath(pathname: string): string {
  if (isEnglishPath(pathname)) {
    const next = pathname.replace(/^\/en(?=\/|$)/, '');
    return next || '/';
  }

  if (pathname === '/') return '/en/';
  return `/en${pathname}`;
}

export function localizeHref(pathname: string, href: string): string {
  if (!href.startsWith('/')) return href;
  if (isEnglishPath(href)) {
    const locale = getLocale(pathname);
    return locale === 'en' ? href : (href.replace(/^\/en(?=\/|$)/, '') || '/');
  }

  const locale = getLocale(pathname);
  if (locale === 'en') {
    return href === '/' ? '/en/' : `/en${href}`;
  }

  return href;
}
