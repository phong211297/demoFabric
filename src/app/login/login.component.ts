import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Login } from 'src/ngrx/auth/_actions/auth.actions';
import { currentAuthToken } from 'src/ngrx/auth/_selectors/auth.selector';
import { AppState } from 'src/ngrx/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //#region Properties

  //#endregion

  //#region Constructor
  public constructor(private store: Store<AppState>) {
    console.log('Run here');
    this.store.dispatch(new Login({ authToken: 'dsadsaasdsadadsas' }));
  }
  //#endregion

  //#region Methods
  public ngOnInit(): void {
    this.store.dispatch(new Login({ authToken: 'as' }));

    this.store.select(currentAuthToken).subscribe((data) => console.log(data));
  }

  //#endregion
}
