#include "User.hpp"

namespace zjubcabounty{
    void User::adjust(){

    }

    [[eosio::action]]
    void User::newregister(const account_name newuser){
        User::userIndex users(_self,_self);
        auto iterator = users.find(newuser);
        eosio_assert(iterator == users.end(), "This user already registered !!!");

        users.emplace(newuser, [&](auto& users) {
            users.username = newuser;   
            users.gpaplus = 0; 
            users.totalbounty = "0 ZJUBCA"; 
            users.awscore = 0; 
        });

    }

    [[eosio::action]]
    void User::updateuser(const account_name user, 
                          uint64_t gpaplus, 
                          string& totalbounty,
                          int awscore,
                          int newtask_id){

        User::userIndex users(_self,_self);
        auto iterator = users.find(newuser);
        eosio_assert(iterator == users.end(), "This user already registered !!!");
        
        if(gpaplus)
            users.modify(iterator, user, [&](auto& users){
                users.gpaplus = gpaplus;
            });
        if(totalbounty!="")
            users.modify(iterator, user, [&](auto& users){
                users.totalbounty = totalbounty;
            });
        if(awscore)
            users.modify(iterator, user, [&](auto& users){
                users.awscore = awscore;
            });
        if(newtask_id>0)
            users.modify(iterator, user, [&](auto& users){
                users.taskpartin.push_back(newtask_id);
            });
    }

    [[eosio::action]]
    void getuser(const account_name user){
        User::userIndex users(_self,_self);
        auto iterator = users.find(newuser);
        eosio_assert(iterator == users.end(), "This user already registered !!!");

        auto theuser = user.get(user);
        print(" { \"name\": ", user.username,
              "   \"gpapluse\": ", user.gpaplus,
              "   \"totalbounty\": ", user.totalbounty,
              "   \"awscore\": ", user.awscore);
        print("   \"taskpartin\": [");
        if (theuser.taskpartin.size() > 0) {
            for (int i = 0; i < theuser.taskpartin.size(); i++) {
                print(" \"",theuser.taskpartin.at(i));
                print(" \"");
                if(i < thetask.participants.size()-1)
                    print(",");
            }
            print("],");
        } else {
            print("[], ");//(PARTICIPANTS UNDEFINED YET.)
        }
        print(" } ");
    }

    [[eosio::action]]
    void getranklist(){
        User::userIndex users(_self,_self);
        auto iterator = users.find(newuser);
        eosio_assert(iterator == users.end(), "This user already registered !!!");

        for()
    }

}