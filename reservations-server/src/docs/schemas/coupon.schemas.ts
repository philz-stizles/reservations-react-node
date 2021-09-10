export default {
  Coupon: {
    type: 'object',
    required: ['name', 'expiry', 'discount'], // data type
    properties: {
      name: {
        type: 'string', // data-type
        description: 'The name of the new coupon', // desc
        example: 'SNE1287', // example of an id
      },
      expiry: {
        type: 'string', // data-type
        description: 'When the given coupon will expire', // desc
        example: '2021-11-12 02:03:00', // example of a title
      },
      discount: {
        type: 'number', // data type
        description: 'The discount amount that the coupon attracts', // desc
        example: 12, // example of a completed value
      },
      createdAt: {
        type: 'string',
        description: 'When the coupon was created',
        example: '2021-11-12 02:03:00',
      },
      updatedAt: {
        type: 'string',
        description: 'When the coupon was last modified',
        example: '2021-11-12 02:03:00',
      },
    },
    example: {
      name: 'SHD998',
      expiry: '2021-11-12 02:03:00',
      discount: 3,
      createdAt: '2021-11-12 02:03:00',
      updatedAt: '2021-11-12 02:03:00',
    },
  },
  CouponInput: {
    type: 'object',
    required: ['name', 'expiry', 'discount'], // data type
    properties: {
      name: {
        type: 'string', // data-type
        description: 'The name of the new coupon', // desc
        example: 'SNE1287', // example of an id
      },
      expiry: {
        type: 'string', // data-type
        description: 'When the given coupon will expire', // desc
        example: '2021-11-12 02:03:00', // example of a title
      },
      discount: {
        type: 'number', // data type
        description: 'The discount amount that the coupon attracts', // desc
        example: 12, // example of a completed value
      },
    },
    example: {
      name: 'SHD998',
      expiry: '2021-11-12 02:03:00',
      discount: 3,
    },
  },
};
