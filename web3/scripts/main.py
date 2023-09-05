from brownie import network, accounts

account = None
experiences_contract_addr = "0xBf4d7C4D0B6F66310A911DE778d9AE535862201c";
featuredWorks_contract_addr = "0x749350fcC91e46ceB9C716F2B72A2AB50c32Fdd6";

def use_sepolia_net():
    if network.show_active() != 'sepolia':
        print('Connecting to sepolia network')
        network.disconnect()
        network.connect('sepolia')
        print('Connected to', network.show_active(), 'network')
    else:
        print('Already connected to Sepolia network')

def load_accounts():
    global account
    if len(accounts) == 0:
        print('No account found. Load account ...')
        accounts.load('kmmanoj-brownie')
    account = accounts[0]

def main():
    use_sepolia_net()
    load_accounts()
