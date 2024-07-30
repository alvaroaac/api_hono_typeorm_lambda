import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Insurance extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    policyNumber!: string;

    @Column()
    policyHolderName!: string;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @Column()
    premiumAmount!: number;

    @Column()
    coverageAmount!: number;

    @Column()
    status!: string;

}
