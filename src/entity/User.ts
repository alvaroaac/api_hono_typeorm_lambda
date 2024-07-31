import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: number

    @Column({ type: 'varchar', nullable: true })
    firstName?: string

    @Column({ type: 'varchar', nullable: true })
    lastName?: string

    @Column({ type: 'varchar' })
    email!: string

    @Column({ type: 'varchar' })
    password!: string

}
