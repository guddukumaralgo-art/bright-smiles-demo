const GITHUB_PAGES_BASE = "/bright-smiles-demo";

export function resolveSharedAssetPath(assetPath) {
  if (typeof window === "undefined") {
    return assetPath;
  }

  const { pathname } = window.location;
  if (pathname.startsWith(`${GITHUB_PAGES_BASE}/`) || pathname === GITHUB_PAGES_BASE) {
    return `${GITHUB_PAGES_BASE}${assetPath}`;
  }

  return assetPath;
}
