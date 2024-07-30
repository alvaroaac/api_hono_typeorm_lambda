import { Context, Hono } from "hono";
import { createInsurance, deleteInsurance, getInsurance, getInsurances, updateInsurance } from "../controllers/insurance";

const insurance = new Hono();

insurance.get('/', (c: Context) => getInsurances)
insurance.get('/:id', (c: Context) => getInsurance)
insurance.post('/', (c: Context) => createInsurance)
insurance.put('/', (c: Context) => updateInsurance)
insurance.delete('/', (c: Context) => deleteInsurance)

export { insurance };