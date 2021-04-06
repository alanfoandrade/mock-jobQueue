import IPortalProvider from '../models/IPortalProvider';
import IDispatchPortalDTO from '../dtos/IDispatchPortalDTO';

export default class FakePortalProvider implements IPortalProvider {
  private messages: IDispatchPortalDTO[] = [];

  public async dispatchPortal(message: IDispatchPortalDTO): Promise<void> {
    this.messages.push(message);
  }
}
