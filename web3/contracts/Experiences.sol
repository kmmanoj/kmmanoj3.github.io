// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Experiences {
    struct Experience {
        string expType;
        string organization;
        string role;
        string period;
        string description;
    }

    address public owner;
    string public desc; 
    Experience[] public experiences;
    
    constructor() {
        owner = tx.origin;
        desc = "kmmanoj's experience";
    }

    modifier onlyOwner() {
        require(tx.origin == owner, "You are not allowed to perform this action");
        _;
    }

    function getExperiences() public view returns(Experience[] memory) {
        return experiences;
    }

    function addExperience(string memory expType, string memory org, string memory role, string memory period, string memory description) public onlyOwner {
        Experience memory experience = Experience(
            expType,
            org,
            role,
            period,
            description
        );
        experiences.push(experience);
    }

    function removeExperience(uint256 index) public onlyOwner {
        if(index >= experiences.length) return;
        for(uint256 i=index;i<experiences.length-1;i++) {
            experiences[i] = experiences[i+1];
        }
        experiences.pop();
    }

    function clearExperiences() public onlyOwner {
        delete experiences;
    }
}