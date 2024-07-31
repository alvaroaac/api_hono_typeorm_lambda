import { Context, Hono } from "hono";
import { createInsurance, deleteInsurance, getInsurance, getInsurances, updateInsurance } from "../controllers/insurance";

const insurance = new Hono();

insurance.get('/', getInsurances)
insurance.get('/:id', getInsurance)
insurance.post('/', createInsurance)
insurance.put('/', updateInsurance)
insurance.delete('/', deleteInsurance)

export { insurance };