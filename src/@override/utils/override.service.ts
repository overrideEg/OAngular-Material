import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Styles } from './interfaces/styles';
import { Lang } from './interfaces/lang.enum';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OverrideService {
  language: Observable<string>;
  constructor(
    private translate: TranslateService,
    private titleService: Title
  ) {
    this.language = of(localStorage.getItem('language'));
  }

  // Languages
  get currentLang() {
    return localStorage.getItem('language');
  }
  get lang(): Observable<string> {
    return this.language;
  }

  public get userType(): string {
    return atob(sessionStorage.getItem(btoa('userType')));
  }

  public get loggedIn(): boolean {

    return sessionStorage.getItem('toekn') != null;

  }
  get otherLang() {
    switch (localStorage.getItem('language')) {
      case 'en':
        return 'ar';
      case 'ar':
        return 'en';
      default:
        return 'en';
    }

  }

  switchLanguage(language: string, key?: string) {
    if (language in Lang) {
      if (this.currentLang != language) {
        this.translate.use(language);
        this.language = of(language);
        localStorage.setItem('language', language);
        this.setTitle(key || 'Override');
        this.setStyle();
      }
    } else {
      this.translate.use('en');
    }
  }

  inverseLang(keyLang) {
    return keyLang === 'en' ? 'ar' : 'en';
  }

  // Title
  setTitle(key: string) {
    return this.translate.get(key).subscribe((data) => {
      this.titleService.setTitle(data);
    });
  }

  // Style
  setStyle() {
    const keyLang = this.currentLang || this.translate.getDefaultLang();
    const styleFiles = Styles[keyLang];
    const htmlElement = document.getElementsByTagName('html')[0];
    const headElements = document.getElementsByTagName('head')[0];
    // const paras = document.getElementsByClassName(this.inverseLang(keyLang));
    // if (paras) {
    //   while (paras[0]) {
    //     paras[0].parentNode.removeChild(paras[0]);
    //   }
    // }
    htmlElement.setAttribute('lang', keyLang);
    if (keyLang === 'ar') {
      htmlElement.setAttribute('dir', 'rtl');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
    }
    for (let i = 0; i < styleFiles.length; i++) {
      const node = document.createElement('link');
      node.setAttribute('rel', 'stylesheet');
      node.setAttribute('type', 'text/css');
      node.setAttribute('href', Styles[keyLang][i]);
      // node.setAttribute('class', keyLang);
      headElements.appendChild(node);
    }
  }



  isRTL(): boolean {
    let rtl = false;
    this.lang.subscribe(lang => {
      lang == 'ar' ? rtl = true : rtl = false;
    });
    return rtl;
  }



}
