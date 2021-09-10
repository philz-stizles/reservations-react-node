import mongoose from 'mongoose';
import Audit from '@src/models/audit.model';

describe('Audit Model', () => {
  it('has all the required attributes', () => {
    const expectedKeys = [
      'action',
      'ip',
      'type',
      'method',
      'payload',
      'createdBy',
    ];
    const modelAttributes = Object.keys(Audit.schema.paths);
    expect(expectedKeys.every(key => modelAttributes.includes(key))).toEqual(
      true
    );
  });

  it('should create a new audit log', async () => {
    try {
      // Create new mock Audit
      const newMockAudit = {
        action: 'some action',
        ip: '27.0.0.1',
        method: 'POST',
        type: 'auth:login',
        payload: '/{/}',
        createdBy: new mongoose.Types.ObjectId(),
      };

      // Save new mock Audit
      const createdMockAudit = await new Audit(newMockAudit).save();

      expect(createdMockAudit._id).toBeDefined();
      expect(createdMockAudit.action).toEqual(newMockAudit.action);
      expect(createdMockAudit.ip).toEqual(newMockAudit.ip);
      expect(createdMockAudit.method).toEqual(newMockAudit.method);
      expect(createdMockAudit.type).toEqual(newMockAudit.type);
      expect(createdMockAudit.payload).toEqual(newMockAudit.payload);
      expect(createdMockAudit.createdBy.toHexString()).toEqual(
        newMockAudit.createdBy.toHexString()
      );
      expect(createdMockAudit.createdAt).toBeDefined();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  });

  it('should throw an error if the action field is empty', async () => {
    try {
      await new Audit({
        action: '',
        ip: '27.0.0.1',
        method: 'POST',
        type: 'auth:login',
        payload: '/{/}',
        createdBy: new mongoose.Types.ObjectId().toHexString(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.action.kind).toEqual('required');
    }
  });

  it('should throw an error if the action field is empty', async () => {
    try {
      await new Audit({
        action: 'Some action',
        ip: '',
        method: 'POST',
        type: 'auth:login',
        payload: '/{/}',
        createdBy: new mongoose.Types.ObjectId().toHexString(),
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.ip.kind).toEqual('required');
    }
  });

  it('should throw an error if the createdBy field is empty', async () => {
    try {
      await new Audit({
        action: 'Some action',
        ip: '127.0.0.1',
        method: 'POST',
        type: 'auth:login',
        payload: '/{/}',
      }).save();
    } catch (err: any | unknown) {
      expect(err.errors.createdBy.kind).toEqual('required');
    }
  });
});
