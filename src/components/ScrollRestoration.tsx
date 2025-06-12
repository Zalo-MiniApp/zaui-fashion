import { useRouteHandle } from 'miniapp-core/src';
import { FC, useEffect } from 'react';
import { useLocation, useMatches } from 'react-router';

const scrollPositions = {};

function findElementWithScrollbar(rootElement: Element = document.body) {
  if (rootElement.scrollHeight > rootElement.clientHeight) {
    // If the element has a scrollbar, return it
    return rootElement;
  }

  // If the element doesn't have a scrollbar, check its child elements
  for (let i = 0; i < rootElement.children.length; i++) {
    const childElement = rootElement.children[i];
    const elementWithScrollbar = findElementWithScrollbar(childElement);
    if (elementWithScrollbar) {
      // If a child element has a scrollbar, return it
      return elementWithScrollbar;
    }
  }

  // If none of the child elements have a scrollbar, return null
  return null;
}

export const ScrollRestoration: FC = () => {
  const location = useLocation();
  const [handle] = useRouteHandle();

  useEffect(() => {
    // Look for the main scroll element on the page
    const content = findElementWithScrollbar();
    if (content) {
      if (handle.scrollRestoration !== undefined) {
        content.scrollTo(0, handle.scrollRestoration);
      } else {
        const key = `${location.pathname}${location.search}`;
        if (scrollPositions[key]) {
          // Scroll to the previous position on this new location
          content.scrollTo(0, scrollPositions[key]);
        }
        const saveScrollPosition = (e: Event) => {
          // Save position on scroll
          scrollPositions[key] = content.scrollTop;
        };
        content.addEventListener('scroll', saveScrollPosition);
        return () => content.removeEventListener('scroll', saveScrollPosition);
      }
    }
    return () => {};
  }, [location]);

  return <></>;
};
