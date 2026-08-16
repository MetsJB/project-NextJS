import { JWTdata, verifyAccessToken } from '@/lib/auth/jwt';
import { JWTPayload } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

type Handler<Context> = (
  request: NextRequest,
  payload: JWTdata | JWTPayload,
  context: Context,
) => Promise<NextResponse> | NextResponse;

export function withAuth<Context= unknown>(handler: Handler<Context>, options?: {role?:string}) {
    return async (request: NextRequest, context: Context) => {
        const token = request.cookies.get('accessToken')?.value

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

        const payload = await verifyAccessToken(token) 

        if(!payload){
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
        }

        if(options?.role && payload.role !== options.role){
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        return handler(request, payload, context)

}}