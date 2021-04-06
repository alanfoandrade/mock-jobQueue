import IPortalProvider from '../models/IPortalProvider';
import IDispatchPortalDTO from '../dtos/IDispatchPortalDTO';
import portalApi from '../apis/portalApi';

export default class PortalProvider implements IPortalProvider {
  public async dispatchPortal(data: IDispatchPortalDTO): Promise<void> {
    await portalApi.post('/', data);
  }
}
