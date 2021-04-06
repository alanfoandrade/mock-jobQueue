import IDispatchPortalDTO from '../dtos/IDispatchPortalDTO';

export default interface IPortalProvider {
  dispatchPortal(data: IDispatchPortalDTO): Promise<void>;
}
