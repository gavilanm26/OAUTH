export class User {
  constructor(
    public readonly customerKey: string,
    public readonly type: string,
    public readonly documentNumber: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public password: string,
    public readonly secondName?: string,
    public readonly secondLastName?: string,
  ) {}

  static create(
    type: string,
    documentNumber: string,
    firstName: string,
    lastName: string,
    password: string,
    encryptedCustomerKey: string,
    secondName?: string,
    secondLastName?: string,
  ) {
    return new User(
      encryptedCustomerKey,
      type,
      documentNumber,
      firstName,
      lastName,
      password,
      secondName,
      secondLastName,
    );
  }
}
