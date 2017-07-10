export class LoadingPage {

  public loading: boolean;

  constructor(val: boolean) {
    this.loading = val;
  }

  standby() {
    this.loading = true;
  }

  ready() {
    this.loading = false;
  }
}
