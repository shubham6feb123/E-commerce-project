import React from 'react'

//components
import { Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';

const antIcon = <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />;
function Loading({text}) {
    return (
        <div style={{width:"100%",height:"86vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Spin indicator={antIcon} />
        </div>
    )
}

export default Loading

