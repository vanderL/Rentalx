import { FakeUsersRepository } from "@modules/accounts/repositories/fakes/FakeUsersRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { FakeUsersTokensRepository } from "@modules/accounts/repositories/fakes/FakeUsersTokensRepository";
import { FakeMailProvider } from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import { AppError } from "@errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let fakeUsersRepository: FakeUsersRepository;
let dateProvider: DayjsDateProvider;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeMailProvider: FakeMailProvider;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    dateProvider = new DayjsDateProvider();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      dateProvider,
      fakeMailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    const user = {
      driver_license: "2640068972",
      email: "lewize@ok.ve",
      name: "Jayden Burton",
      password: "d32272df-9f25-593c-998a-8b41738f776c"
    };

    await fakeUsersRepository.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("deb@eb.sm")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(fakeUsersTokensRepository, "create");

    const user = {
      driver_license: "945029687",
      email: "la@kefpug.ar",
      name: "Cecilia Boyd",
      password: "a52c222b-3f82-5d63-99b1-12635f6b1107"
    };

    fakeUsersRepository.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(generateTokenMail).toBeCalled();
  })
})
