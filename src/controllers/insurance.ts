import { Context } from 'hono';
import { Insurance } from '../entity/Insurance';

export const createInsurance = async (c: Context) => {
    try {
        const data = await c.req.json();
        const insurance = Insurance.create(data);
        const result = await insurance.save();
        return c.json(result, 201);
    } catch (error: any) {
        return c.json({ message: 'Error creating insurance', error: error.message }, 500);
    }
};

export const getInsurances = async (c: Context) => {
    try {
        console.log('Entered request GET: Insurances');
        
        const insurances = await Insurance.find();
        return c.json(insurances);
    } catch (error: any) {
        return c.json({ message: 'Error fetching insurances', error: error.message }, 500);
    }
};

export const getInsurance = async (c: Context) => {
    try {
        const insurance = await Insurance.findOneBy({ id: c.req.param('id') });
        if (insurance) {
            return c.json(insurance);
        }
        return c.json({ message: 'Insurance not found' }, 404);
    } catch (error: any) {
        return c.json({ message: 'Error fetching insurance', error: error.message }, 500);
    }
};

export const updateInsurance = async (c: Context) => {
    try {
        const insurance = await Insurance.findOneBy({ id: c.req.param('id') });
        if (insurance) {
            Object.assign(insurance, await c.req.json());
            const result = await insurance.save();
            return c.json(result);
        }
        return c.json({ message: 'Insurance not found' }, 404);
    } catch (error: any) {
        return c.json({ message: 'Error updating insurance', error: error.message }, 500);
    }
};

export const deleteInsurance = async (c: Context) => {
    try {
        const insurance = await Insurance.findOneBy({ id: c.req.param('id') });
        if (insurance) {
            await insurance.remove();
            return c.json({ message: 'Insurance deleted successfully' }, 200);
        }
        return c.json({ message: 'Insurance not found' }, 404);
    } catch (error: any) {
        return c.json({ message: 'Error deleting insurance', error: error.message }, 500);
    }
};
