'use client'

import { IUser } from '@/types/backend';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import '@/styles/pages/Overview.scss';

interface IProps {
    users: IUser[] | [];
}

const OverviewTable = (props: IProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const { users } = props;
    return (
        <div className='overview-wrapper'>
            <div className='col'>
                <h3>Vấn đề</h3>
                <h4>Cần xử lý</h4>
                <ul>
                    <li>Trùng lặp tệp đối chiếu<span>0</span></li>
                    <li>Tệp đối chiếu không hợp lệ<span>0</span></li>
                    <li>Xung đột quyền sở hữu<span>0</span></li>
                    <li>Yêu cầu chuyển nhượng quyền sở hữu<span>0</span></li>
                    <li>Thông báo xác nhận quyền sở hữu tiềm ẩn<span>0</span></li>
                    <li>Thông báo xác nhận quyền sở hữu bị phản đối<span>0</span></li>
                </ul>
                <button>Xem tất cả vấn đề</button>
            </div>
            <div className='col'>
                <h3>Tổng quan về các kênh</h3>
                <ul>
                    <li>Kênh đang hoạt động và đã nhận cảnh cáo vi<span>0</span></li>
                    <li>Số yêu cầu hủy liên kết<span>0</span></li>
                    <li>Số lời mời đang chờ xử lý<span>0</span></li>
                    <li>Không kiếm tiền<span>18</span></li>
                    <li>Tỷ lệ chấp nhận lời mời (30 ngày)<span>100%</span></li>
                </ul>
            </div>
        </div>
    )
}

export default OverviewTable;