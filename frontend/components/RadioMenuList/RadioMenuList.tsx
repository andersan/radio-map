import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Scrollbars } from "react-custom-scrollbars-2";

import { VariableSizeList } from 'react-window';

class RadioMenuList extends React.Component {
    state = {
        listItems: [],
        flatListItems: [],
        selectItem: null,
    }

    constructor(props:any) {
        super(props);
        this.state = {
            listItems: [],
            flatListItems: [],
            selectItem: null,
        }

        if (props.listItems &&
            props.listItems !== undefined &&
            Array.isArray(props.listItems) && props.listItems.length > 0) {
                this.setState({ listItems: this.props.listItems.map(contentTopLevel => contentTopLevel.items).flat(1)});
                this.setState({ flatListItems: this.flattenListItems(this.props.listItems)});
            }

        this.renderFlattenedRow = this.renderFlattenedRow.bind(this);
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
            console.log(JSON.stringify(this.props.listItems.map(contentTopLevel => contentTopLevel.items).flat(1)));
            console.log(JSON.stringify(this.props.listItems.flat(1)));
            this.setState({ flatListItems: this.flattenListItems(this.props.listItems)});
        }

        if (this.state.selectItem !== this.props.selectItem) {
            console.log("selectItem updated");
            this.setState({ selectItem: this.props.selectItem});
            console.log(this.props.selectItem);
        }
    }
    /*{
        "itemsType": "channel",
        "title": "Stations in Austin TX",
        "type": "list",
        "items": [
            {
                "href": "/listen/fluffertrax/DZGmaNmu",
                "title": "FluffertraX"
            },
            {
                "page": {
                    "type": "page",
                    "count": 26,
                    "map": "Aq7xeIiB",
                    "subtitle": "All Stations",
                    "title": "Austin TX",
                    "url": "/visit/austin-tx/Aq7xeIiB/channels"
                },
                "rightAccessory": "chevron-right",
                "title": "View all 26 stations",
                "type": "more"
            }
        ]
    },
    {
        "actionPage": {
            "type": "page",
            "count": 26,
            "map": "Aq7xeIiB",
            "subtitle": "Popular Stations",
            "title": "Austin TX",
            "url": "/visit/austin-tx/Aq7xeIiB/popular"
        },
        "actionText": "See all",
        "items": [
            {
                "href": "/listen/austin-blues-radio/_hQCemA1",
                "title": "Austin Blues Radio"
            }
        ],
        "itemsType": "channel",
        "title": "Popular in Austin TX",
        "type": "list"
    },
    {
        "itemsType": "channel",
        "title": "Picks from the Area",
        "type": "list",
        "items": [
            {
                "map": "ILSa1N2P",
                "href": "/listen/wordpress/ILSa1N2P",
                "title": "Majic 104.3 - WMJU",
                "subtitle": "Buda TX"
            }
        ]
    },
    {
        "itemsType": "channel",
        "title": "Popular in United States",
        "type": "list",
        "items": [
            {
                "map": "1vlrqH6v",
                "href": "/listen/smooth-jazz-24-7/1vlrqH6v",
                "title": "Smooth Jazz 24/7",
                "subtitle": "New York NY"
            },
            {
                "rightAccessory": "chevron-right",
                "title": "Go to United States",
                "type": "more",
                "page": {
                    "type": "page",
                    "map": "9Yi25umJ",
                    "title": "United States",
                    "url": "/visit/united-states/GhDXw4EW"
                }
            }
        ]
    },
    {
        "rightAccessory": "chevron-right",
        "title": "Nearby Austin TX",
        "type": "list",
        "items": [
            {
                "page": {
                    "map": "80Nyw6zH",
                    "url": "/visit/buda-tx/80Nyw6zH",
                    "type": "page",
                    "count": 1,
                    "title": "Buda TX",
                    "subtitle": "United States"
                },
                "title": "Buda TX",
                "rightDetail": "23 km"
            }
        ]
    },
    {
        "rightAccessory": "chevron-right",
        "title": "Cities in United States",
        "type": "list",
        "items": [
            {
                "page": {
                    "map": "9Yi25umJ",
                    "url": "/visit/new-york-ny/9Yi25umJ",
                    "type": "page",
                    "count": 230,
                    "title": "New York NY",
                    "subtitle": "United States"
                },
                "title": "New York NY",
                "leftAccessory": "count",
                "leftAccessoryCount": 230
            }
        ]
    }
]
}*/

    /*
    *   
    *   Attributes in items:
    *   - title: string
    *   - subtitle: string
    *   - [map]: string (ID of place/channel) -- not included if place is known
    *   - [href]: string (path of channel in radio garden) -- always included for channels
    *   - [url]: string (path of place in radio garden) -- always included for places
    *   - [page]: object (page object) -- used when a button to access another "page" in the menu is included, i.e. another place
    *       - may include a type of page/place not usually accessible on map, e.g. entire US or popular page
    *   - [rightAccessory]: string (name of icon to display on the right side of the item) -- used when a button to access another "page" in the menu is included 
    *   
    *   Attributes in top level (content):
    *   - title: string
    *  - itemsType: string (channel or empty)
    *   - type: string (always is list?)
    *   - actionPage: used to access local popular stations page... just /visit/[place-name]/[place-id/map]/popular
    *   - actionText: string (used to display text on row with actionPage)
    * 
    * 
    *   6 types of list items:
    *  - local channels
    *  - local popular channels (just diff order from local channels)
    *  - picks from area
    *  - popular channels in the country where the place is located
    *  - nearby places
    *  - cities in the country where the place is located
    * */

    flattenListItems(listItems) {
        let flattenedListItems = [];
        for (let i = 0; i < listItems.length; i++) {
            flattenedListItems.push(listItems[i]);
            if (listItems[i].items) {
                for (let j = 0; j < listItems[i].items.length; j++) {
                    flattenedListItems.push(listItems[i].items[j]);
                }
            }
        }
        console.log("flattenedListItems");
        console.log(flattenedListItems);
        return flattenedListItems;
    }
    
    renderFlattenedRow({ index, style }) {
        console.log("renderFlattenedRow");
        console.log({index, style});
        // console.log(this.state.flatListItems);
        // console.log(this.state.flatListItems && this.state.flatListItems.length > 0) 
        if (this.state.flatListItems && this.state.flatListItems.length > 0) {
            if (this.state.flatListItems[index].items) {
                return (
                    <ListItem style={style} key={index} component="div"
                    // disablePadding
                    className={"list-item-header"}>
                        <ListItemText
                        primaryTypographyProps={{fontSize: 22}}
                        // sx={{ padding: '100%' }}
                        primary={this.state.flatListItems[index].title}
                        />
                        {this.state.flatListItems[index].actionPage ? 
                            <ListItemButton>
                                <ListItemText
                                children={this.state.flatListItems[index].actionText}
                                // onClick={() => console.log("ACTION PAGE: " + this.state.flatListItems[index].actionPage.url)}
                                onClick={() => this.state.selectItem(this.state.flatListItems[index].actionPage)}
                                className={"action-page-button"}
                                />

                            </ListItemButton>
                        : null}
                    </ListItem>
                );
            }
            else if (this.state.flatListItems[index].page) {
                return (
                    <ListItem style={style} key={index} component="div" 
                    disablePadding
                    className={"place-list-item"}
                    onClick={() => this.state.selectItem(this.state.flatListItems[index])}
                    >
                    <ListItemButton>
                        <ListItemText 
                        primary={this.state.flatListItems[index].title}
                        />
                        <ChevronRightRoundedIcon/>
                    </ListItemButton>
                    </ListItem>);
            }
            else {
                return (
                    <ListItem style={style} key={index} component="div" 
                    disablePadding
                    className={this.state.flatListItems[index].subtitle ? 'channel-list-item-with-subtitle' : 'channel-list-item-single-line'}
                    onClick={() => this.state.selectItem(this.state.flatListItems[index])}
                    >
                    <ListItemButton>
                        <ListItemText 
                        primary={this.state.flatListItems[index].title}
                        secondary={this.state.flatListItems[index].subtitle}
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

    getFlatItemSize = index => {
        if (this.state.flatListItems && this.state.flatListItems.length > 0) 
            if (this.state.flatListItems[index].subtitle || 
                this.state.flatListItems[index].items ||
                this.state.flatListItems[index].actionPage)
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
            this.state && this.state.flatListItems && this.state.flatListItems.length > 0 ? (

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
                    itemSize={this.getFlatItemSize}
                    itemCount={this.state.flatListItems.length}
                    // itemCount={10}
                    overscanCount={5}
                    // overflow="hidden"
                    ref={this.listRef}
                    style={{ overflow: false }}
                >
                    {this.renderFlattenedRow}
                </VariableSizeList>
            </Scrollbars>
          </Box>) : <div></div>
        //   () => <div></div>
            // <div></div>
        );
    }
}

export default RadioMenuList;