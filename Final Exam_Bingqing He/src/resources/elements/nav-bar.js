import { inject } from './aurelia-framework';
import { Router } from './aurelia-router';

@inject(Router)
export class  NavBar {
    constructor(){
        this.authenticated = false;
        this.router = router;
    }

    logout(){
        this.authenticated = false;
        this.router.navigate('landing');
    }
}