import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedsComponent } from './feeds/feeds.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: FeedComponent ,
        children:[
            {path:'', redirectTo:'feeds', pathMatch:'full'},
            {path:'feeds',component: FeedsComponent },
            { path: 'profile', component: ProfileComponent }
        ]
    },
    
    { path: '**', redirectTo: '/login'  }
];

