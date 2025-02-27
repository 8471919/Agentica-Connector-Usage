export class Handmade {
  private email: string | null;

  constructor() {
    this.email = null;
  }

  /**
   * If user want to get user's email, execute this function.
   */
  getMyEmail() {
    return this.email;
  }

  /**
   * If user want to set new email, execute this function.
   */
  setMyEmail(input: { email: string }) {
    this.email = input.email;
  }
}
