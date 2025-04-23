function hideRecommendedPosts() {
    document.querySelectorAll("shreddit-post[recommendation-source]").forEach(el => {
      el.style.display = "none"; // or el.remove() if you prefer to delete it entirely
    });
  }

  const blockedHrefs = [
    "/r/popular",
    "/r/all"
  ];
  
  function hideLinksByHref() {
    document.querySelectorAll("a[href]").forEach(a => {
      const href = a.getAttribute("href");
      if (blockedHrefs.some(blocked => href.includes(blocked))) {
        a.style.display = "none"; // or a.remove();
      }
    });
  }

  const blockedSidebarIds = [
    "popular-posts",
    "all-posts"
  ]
  function hideSideBarButtons() {
    blockedSidebarIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.style.display = "none";
        console.log(`Hid sidebar item with id=${id}`);
      }
    });
  }
  function hideAll() {
    hideRecommendedPosts();
    hideLinksByHref();
    hideSideBarButtons();
  }

  // Run once after DOM load
  document.addEventListener("DOMContentLoaded", hideAll);
  
  // Use MutationObserver to catch dynamically loaded posts (very common on Reddit)
  const observer = new MutationObserver(hideRecommendedPosts);
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  