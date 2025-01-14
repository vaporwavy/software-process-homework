import React, { Component } from 'react'

export default class Person extends Component {
    constructor(){
        super();
        this.state={
            data:[1,2,3]
        }
    }

    componentDidMount(){
        fetch("/manager/list")
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                data:res
            })
        })
    }

    delItem = (idx,username) => {
        // this.setState((state,props)=>{
        //     return {
        //         data:state.data.filter((item,index)=>idx!==index)
        //     }
        // })
        fetch('/backlogin/deluser',{
            method: "POST",
            mode : 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${username}`
        })
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                data:res
            })
        })
    }
    render() {
        return (
            <div>
                <div className='psup'>
                   <span>
                       管理员信息管理
                    </span> 
                    <input name='keyword' placeholder='请输入想查找的人员姓名' type='search' />
                    <button></button>
                </div> 
                <div className='psmiddle'>
                    <input type='checkbox'  />
                    <span>姓名</span>
                    <span>性别</span>
                    <span>电话</span>
                    <span>邮箱</span>
                    <span>编辑</span>
                </div>
                <div className='psdown'>    
                {
                    this.state.data.map((item,idx)=>(
                            <li key={idx}>
                            <input type='checkbox'  />
                            <span>{item.username}</span>
                            <span>{item.sex}</span>
                            <span>{item.tel}</span>
                            <span>{item.mail}</span>
                            <span>
                                <button>查看</button>
                                <button onClick={()=>this.delItem(idx,item.username)} >删除</button>
                            </span>
                        </li>)
                    )
                }
                </div>
            </div>
        )
    }
}
