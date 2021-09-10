import Audit from '../models/audit.model';
import * as factory from '../factories/handler.factory';

export const getFilteredAuditTrail = factory.getAll(Audit);

export const getAuditById = factory.getOne(Audit);
