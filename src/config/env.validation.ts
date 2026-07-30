import * as zod from 'zod';
const validationSchema = zod.object({
    NODE_ENV: zod.union([zod.literal('development'), zod.literal('production'), zod.literal('test')]).default('development'),
    DB_TYPE: zod.string(),
    DB_HOST: zod.string(),
    DB_PORT: zod.string(),
    DB_USERNAME: zod.string(),
    DB_PASSWORD: zod.string(),
    DB_NAME: zod.string()
});
export default validationSchema;