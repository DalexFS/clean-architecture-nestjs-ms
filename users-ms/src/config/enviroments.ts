import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Determinar entorno actual
const NODE_ENV = process.env.NODE_ENV || 'development';

// Cargar archivo .env correspondiente
const envFilePath = path.resolve(process.cwd(), `.env.${NODE_ENV}`);
dotenv.config({ path: envFilePath });


interface EnvVars {
  NODE_ENV: 'development' | 'staging' | 'production';
  PORT: number;
  DATABASE_URL: string;
  FRONTEND_URL?: string;
}

const envsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  PORT: Joi.number().required(),


  DATABASE_URL: Joi.string().uri().required(),
  FRONTEND_URL: Joi.string().uri().optional(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Error en la validación de configuración: ${error.message}`);
}

const envVars: EnvVars = value;

// Exportar objeto configurado
export const envs = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,


  DATABASE_URL: envVars.DATABASE_URL,
  FRONTEND_URL: envVars.FRONTEND_URL,
};
