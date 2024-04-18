import { NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToolbarModule } from '../shell/toolbar/toolbar.module';
import { NavbarModule } from '../shell/navbar/navbar.module';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { graphqlUri } from './graphql.module';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IDENTITY_FEATURE_ID, identityReducer } from '../identity/domain/state/identity.reducer';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ApolloModule,
        HttpClientModule,
        ToolbarModule,
        NavbarModule,
        RouterOutlet,
        AppRoutingModule,
        StoreModule.forRoot({routerReducer, identity: identityReducer}, {}),
        StoreRouterConnectingModule.forRoot({stateKey: 'router-reducer'}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })],
    exports: [],
    providers: [
      provideAnimationsAsync(),
      {
        provide: APOLLO_OPTIONS,
        useFactory(httpLink: HttpLink){
          return {
            cache: new InMemoryCache(),
            link: httpLink.create({
              uri: graphqlUri
            })
          }
        },
        deps: [HttpLink]
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
