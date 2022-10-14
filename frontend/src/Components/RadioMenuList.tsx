import React from 'react';
import useState from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// import for detailed row
// import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { FixedSizeList } from 'react-window';

import RadioMenuListRow from './RadioMenuListRow';

class RadioMenuList extends React.Component {
    state = {
        listItems: [],
    }

    constructor(props:any) {
        super(props);
        this.state = {
            listItems: [],
        }
        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount(): void {
        // alert("RadioMenu mounted!!!");
        console.warn("RadioMenuList mounted!!!");
    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate RadioMenuList");
        console.log(prevProps.listItems);
        console.log(this.props.listItems);


        if (prevProps.listItems !== this.props.listItems) {
            console.log("listItems updated");
            // this.setState({ listItems: this.props.listItems});
            this.setState({ listItems: this.props.listItems.map(contentTopLevel => contentTopLevel.items).flat(1)});
            // this.setState({ listItems: [{title: "hello"}, {title: "hello2"}]});
            console.log(this.props.listItems.map(contentTopLevel => contentTopLevel.items).flat(1))
        }
    }

    renderRow({ index, style }) {
        console.log("renderRow");
        console.log(this.state.listItems);
        if (this.state.listItems && this.state.listItems.length > 0) 
            return () => (
                <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText primary={this.state.listItems[index].title}/>
                    {/* <ListItemText primary={"hello"}/> */}
                </ListItemButton>
                </ListItem>);
        else return () => <div></div>;
    }

    // renderRow(input:string) {
    //     let index = 0;
    //     console.log("renderRow");
    //     console.log(input);
    //     console.log(typeof input);
    //     return () => (
    //         <ListItem key={index} component="div" disablePadding>
    //         <ListItemButton>
    //             {/* <ListItemText primary={listItems[index + 1].title}/> */}
    //             <ListItemText primary={input}/>
    //         </ListItemButton>
    //         </ListItem>);
    // }

    render() {
        return (
            this.state && this.state.listItems && this.state.listItems.length > 0 ? (
          <Box
            id="place-info-list"
            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <FixedSizeList
                height={400}
                width={"100%"}
                itemSize={46}
                itemCount={this.state.listItems.length}
                // itemCount={10}
                overscanCount={5}
                overflow="hidden"
            >
                {this.renderRow}
            </FixedSizeList>
          </Box>) : <div></div>
        //   () => <div></div>
            // <div></div>
        );
    }
}

export default RadioMenuList;