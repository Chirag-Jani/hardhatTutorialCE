const { expect } = require("chai");

describe("Token Contract", () => {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  // this describe block is testing if deployment is done right or not
  describe("Deployment", () => {
    it("Should set the right owner.", async () => {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should allocate total supply to the owner/deployer.", async () => {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  // This block will test the transactions
  describe("Testing Transactions", () => {
    it("Should transfer token between accounts", async () => {
      // between owner and account1
      await hardhatToken.transfer(addr1.address, 10);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(10);

      // between account1 and account2
      await hardhatToken.connect(addr1).transfer(addr2.address, 10);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(10);
    });

    it("Should fail if sender does not have enough funds to transfer.", async () => {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not Enough Funds");
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfer.", async () => {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await hardhatToken.transfer(addr1.address, 10); // transfered 10 tokens to address1
      await hardhatToken.transfer(addr2.address, 5); // transfered 5 tokens to address2

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(10);

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(5);

      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 15);
    });
  });
});
