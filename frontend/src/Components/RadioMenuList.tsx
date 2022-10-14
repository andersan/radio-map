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

import { VariableSizeList } from 'react-window';

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
        this.getItemSize = this.getItemSize.bind(this);
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
        // console.log({index, style});
        // console.log(this.state.listItems && this.state.listItems.length > 0) 
        if (this.state.listItems && this.state.listItems.length > 0) 
            return (
                <ListItem style={style} key={index} component="div" 
                disablePadding
                className={this.state.listItems[index].subtitle ? 'row-with-subtitle' : 'single-line-row'}
                >
                <ListItemButton>
                    <ListItemText 
                    primary={this.state.listItems[index].title}
                    secondary={this.state.listItems[index].subtitle}
                    />
                </ListItemButton>
                </ListItem>);
        else return <div id="empty-rows"></div>;
    }

    getItemSize = index => {
        if (this.state.listItems && this.state.listItems.length > 0) 
            if (this.state.listItems[index].subtitle)
                return 72;
            else
                return 48; 
        else
            return 0;
    }

    render() {
        return (
            this.state && this.state.listItems && this.state.listItems.length > 0 ? (
          <Box
            id="place-info-list"
            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <VariableSizeList
                height={400}
                width={"100%"}
                itemSize={this.getItemSize}
                itemCount={this.state.listItems.length}
                // itemCount={10}
                overscanCount={5}
                overflow="hidden"
            >
                {this.renderRow}
            </VariableSizeList>
          </Box>) : <div></div>
        //   () => <div></div>
            // <div></div>
        );
    }
}

export default RadioMenuList;