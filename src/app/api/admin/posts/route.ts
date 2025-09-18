import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();



export const GET = async(request: NextRequest) => {
  try {
    const posts = await prisma.post.findMany({
      include:  {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc', 
      },
    })
    return NextResponse.json({status: 'OK', posts}, {status:200})
  } catch (error) {
    if(error instanceof Error)
    return NextResponse.json({status: error.message},{status:400})
  }
}

export const POST = async(request: NextRequest) => {
  const { title, content, categories, thumbnailUrl }: CreatePost = await request.json()
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    })
    await Promise.all(
      categories.map((category) => 
        prisma.postCategory.create({
          data: {
            categoryId: category.id,
            postId: post.id,
          }
        })
      )
    )

    return NextResponse.json({
      status: 'OK', 
      message: "作成しました", 
      id: post.id,
    })
  } catch (error) {
    if(error instanceof Error)
    return NextResponse.json({status: error.message},{status:400})
  }
}

