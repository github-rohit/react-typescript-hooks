import { RefObject } from 'react';

class Util {
  private scroll = false;

  watchBodyScroll(element: RefObject<HTMLElement>) {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY > 10;
      if (isTop && !this.scroll) {
        (element.current as HTMLElement).classList.add('scroll-fixed');
      } else if (!isTop) {
        (element.current as HTMLElement).classList.remove('scroll-fixed');
      }
    });
  }
  getEncodeURI(str: string) {
    if (str) {
      const encodeURIString = str.replace(/ /g, '-');
      return encodeURIComponent(encodeURIString);
    }

    return '';
  }
}

export default new Util();
