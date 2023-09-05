// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract FeaturedWork {
    struct Work {
        string workType;
        string title;
        string date;
        string description;
        string url;
    }

    address public owner;
    string public desc; 
    Work[] public works;
    
    constructor() {
        owner = tx.origin;
        desc = "kmmanoj's featured work";
    }

    modifier onlyOwner() {
        require(tx.origin == owner, "You are not allowed to perform this action");
        _;
    }

    function getFeaturedWorks() public view returns(Work[] memory) {
        return works;
    }


    function addFeaturedWork(string memory workType, string memory title, string memory date, string memory description, string memory url) public onlyOwner {
        Work memory work = Work(
            workType,
            title,
            date,
            description,
            url
        );
        works.push(work);
    }

    function removeFeaturedWork(uint256 index) public onlyOwner {
        if(index >= works.length) return;
        for(uint256 i=index;i<works.length-1;i++) {
            works[i] = works[i+1];
        }
        works.pop();
    }

    function clearFeaturedWorks() public onlyOwner {
        delete works;
    }
}