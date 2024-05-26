import { Injectable } from "@nestjs/common";
import { Ad, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { AdServiceInterface } from "./ad.interface";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

@Injectable()
export class AdService implements AdServiceInterface {
    constructor(private prisma: PrismaService) {}

    async createAd(createAdDto: CreateAdDto) {
        return this.prisma.ad.create({
            data: createAdDto as Prisma.AdCreateInput,
        });
    }

    async ads(id: string): Promise<Ad[]> {
        return this.prisma.ad.findMany({
            where: { authorId: id },
        });
    }

    async ad(id: string): Promise<Ad> {
        return this.prisma.ad.findUnique({
            where: { id: id },
        });
    }

    async updateAd(id: string, updateAdDto: UpdateAdDto): Promise<Ad> {
        return this.prisma.ad.update({
            where: { id: id },
            data: updateAdDto as Prisma.AdUpdateInput,
        });
    }

    async removeAd(id: string): Promise<Ad> {
        return this.prisma.ad.delete({
            where: { id: id },
        });
    }
}
