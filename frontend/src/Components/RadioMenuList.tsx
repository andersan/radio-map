import React from 'react';
import useState from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Scrollbars } from "react-custom-scrollbars-2";

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
        selectItem: null,
    }

    constructor(props:any) {
        super(props);
        this.state = {
            listItems: [],
            selectItem: null,
        }

        if (props.listItems &&
            props.listItems !== undefined &&
            Array.isArray(props.listItems) && props.listItems.length > 0)
            this.setState({ listItems: this.props.listItems.map(contentTopLevel => contentTopLevel.items).flat(1)});

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
        console.log(this.state.listItems);

        // TODO: this condition is extremely bad 
        if ((prevProps.listItems !== this.props.listItems || this.state.listItems.length !== this.props.listItems.map(contentTopLevel => contentTopLevel.items).flat(1).length) && 
            this.props.listItems &&
            this.props.listItems !== undefined &&
            Array.isArray(this.props.listItems)) {
            console.log("listItems updated");
            // this.setState({ listItems: this.props.listItems});
            this.setState({ listItems: this.props.listItems.map(contentTopLevel => contentTopLevel.items).flat(1)});
            // this.setState({ listItems: [{title: "hello"}, {title: "hello2"}]});
            console.log(this.props.listItems.map(contentTopLevel => contentTopLevel.items).flat(1))
        }

        if (this.state.selectItem !== this.props.selectItem) {
            console.log("selectItem updated");
            this.setState({ selectItem: this.props.selectItem});
            console.log(this.props.selectItem);
        }
    }

    renderRow({ index, style }) {
        console.log("renderRow");
        // console.log(this.state.listItems);
        console.log({index, style});
        // console.log(this.state.listItems && this.state.listItems.length > 0) 
        if (this.state.listItems && this.state.listItems.length > 0) {
            if (this.state.listItems[index].page) {
                return (
                    <ListItem style={style} key={index} component="div" 
                    disablePadding
                    className={"action-list-item"}
                    onClick={() => console.log(this.state.listItems[index].page.url)}
                    >
                    <ListItemButton>
                        <ListItemText 
                        primary={this.state.listItems[index].title}
                        />
                        <ChevronRightRoundedIcon/>
                    </ListItemButton>
                    </ListItem>);
            }
            else {
                return (
                    <ListItem style={style} key={index} component="div" 
                    disablePadding
                    className={this.state.listItems[index].subtitle ? 'row-with-subtitle' : 'single-line-row'}
                    onClick={() => this.state.selectItem(this.state.listItems[index])}
                    >
                    <ListItemButton>
                        <ListItemText 
                        primary={this.state.listItems[index].title}
                        secondary={this.state.listItems[index].subtitle}
                        />
                    </ListItemButton>
                    </ListItem>);
            }
        }
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

    listRef = React.createRef();

    handleScroll = ({ target }) => {
      const { scrollTop } = target;
  
      this.listRef.current.scrollTo(scrollTop);
    };

    render() {
        return (
            this.state && this.state.listItems && this.state.listItems.length > 0 ? (

          <Box
            id="place-info-list"
            sx={{ width: '100%', height: 600, maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <Scrollbars
                autoHeight={true}
                autoHeightMax={600}
                onScroll={this.handleScroll}
            >
                <VariableSizeList
                    height={600}
                    width={'100%'}
                    itemSize={this.getItemSize}
                    itemCount={this.state.listItems.length}
                    // itemCount={10}
                    overscanCount={5}
                    // overflow="hidden"
                    ref={this.listRef}
                    style={{ overflow: false }}
                >
                    {this.renderRow}
                </VariableSizeList>
            </Scrollbars>
          </Box>) : <div></div>
        //   () => <div></div>
            // <div></div>
        );
    }
}

export default RadioMenuList;