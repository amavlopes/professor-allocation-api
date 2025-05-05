import { container } from 'tsyringe';
import { PrismaClient } from '../../generated/prisma';
import { prisma } from '..';

container.register<PrismaClient>('PrismaClient', {
	useValue: prisma,
});
