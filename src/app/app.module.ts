import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { AUTH_PROVIDERS, AuthConfig, AuthHttp } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { ToastComponent } from './shared/toast/toast.component';
import { RacesComponent } from './races/races.component';
import { RacesService } from './services/races.service';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LeaderboardService } from './services/leaderboard.service';
import 'rxjs/Rx';
import { AuthGuard } from './services/auth-guard.service';

import { routing } from './app.routing';
import { AuthService } from "./services/auth-service.service";
import { CovalentCoreModule } from '@covalent/core';
import { RacesModule } from './races/races.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@NgModule({
    declarations: [
        AppComponent,
        ToastComponent,
        RacesComponent,
        NavigationComponent
    ],
    imports: [
        CovalentCoreModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RacesModule,
        LeaderboardModule,
        routing
    ],
    providers: [
        ToastComponent,
        RacesService,
        LeaderboardService,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        AuthService,
        AuthGuard
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})

export class AppModule {
}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({}), http, options);
}
