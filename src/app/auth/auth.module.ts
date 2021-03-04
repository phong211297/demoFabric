import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from 'src/ngrx/auth/_reducers/auth.reducer';
import { AuthService } from 'src/ngrx/auth/_services/auth.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, StoreModule.forFeature('auth', authReducer)],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }
}
