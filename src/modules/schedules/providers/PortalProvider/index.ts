import { container } from 'tsyringe';

import IPortalProvider from './models/IPortalProvider';
import PortalProvider from './implementations/PortalProvider';

container.registerSingleton<IPortalProvider>('PortalProvider', PortalProvider);
