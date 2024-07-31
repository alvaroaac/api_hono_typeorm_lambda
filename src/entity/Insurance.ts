import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Insurance extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    policyNumber!: string;

    @Column({ type: 'varchar' })
    policyHolderName!: string;

    @Column({ type: 'date' })
    startDate!: Date;

    @Column({ type: 'date', nullable: true })
    endDate?: Date;

    @Column({ type: 'decimal', nullable: true })
    premiumAmount?: number;

    @Column({ type: 'decimal', nullable: true })
    coverageAmount?: number;

    @Column({ type: 'varchar' })
    status!: string;
}
