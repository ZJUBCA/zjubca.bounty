#include "Task.hpp"

// const int MAX_CAD = 25;

namespace ZJUBCABOUNTY {
    void printask(uint64_t task_id){
        taskIndex tasks(_self, _self);
        auto iterator = tasks.find(task_id);
        eosio_assert(iterator != tasks.end(), "This task was not found ... ");

        auto thetask = tasks.get(task_id);
        print("||| id: ", thetask.id);
        print(" ||- title: ", thetask.title.c_str());
        // print(" ||- description: ", thetask.description.c_str());
        print(" ||- status: ", thetask.status.c_str());
        print(" ||- rolenumbers: ", thetask.rolenumbers.c_str());
        print(" ||- reward: ", thetask.reward.c_str());
        print(" ||- pledge: ", thetask.pledge.c_str());
        print(" ||- updatedAt: ", thetask.updatedAt.c_str());
        print(" ||- requires: ", thetask.requires.c_str());
        print(" ||- likevote: ", thetask.likevote.c_str());
        print(" ||- hatevote: ", thetask.hatevote.c_str());
        print(" ||- author: ");
        print("||id:",thetask.participants.at(0).id);
        print("||username:",thetask.participants.at(0).username.c_str());
        print(" ||- participants: ");
        if (thetask.participants.size() > 0) {
            for (uint32_t i = 1; i < thetask.participants.size(); i++) {
                // ATN： thetask.participants.at(0).id = 1 ！！！！
                print("||id:",thetask.participants.at(i).id);
                print("||username:",thetask.participants.at(i).username.c_str());
            }
        } else {
            print("(PARTICIPANTS UNDEFINED YET.)");
        }
        print("\n");
    }

    [[eosio::action]]
    void Task::create(const account_name author, uint64_t id, string& authorname, uint64_t authorid, string& title, 
    string& description, string& status, string& rolenumbers, string& reward, string& pledge, string& updatedAt, 
    string& requires, string& likevote, string& hatevote){
        taskIndex tasks(_self, _self);
        auto iterator = tasks.find(project_id);
        eosio_assert(iterator == tasks.end(), "This ID of Task already existed !!!");
        tasks.emplace(author, [&](auto& tasks) {
            tasks.id = id;   tasks.title = title;   tasks.description = description;  tasks.status = status;  
            tasks.rolenumbers = rolenumbers;   tasks.reward = reward;   tasks.pledge = pledge; 
            tasks.updatedAt = updatedAt;   tasks.requires = requires;   tasks.likevote = likevote; 
            tasks.hatevote = hatevote; 
        });
        print("Successfully create a tasks named <strong>",project_name,"</strong> in Coup_de_Grace!");
    }
    // void Task::create(const account_name author, uint64_t project_id, string& project_name){
    //     // print("Inside create...");
    //     // require_auth(account);
    //     taskIndex tasks(_self, _self);
    //     auto iterator = tasks.find(project_id);
    //     eosio_assert(iterator == tasks.end(), " TaskProject already exists");
    //     tasks.emplace(author, [&](auto& surpriseprj) {
    //         surpriseprj.id = project_id;
    //         surpriseprj.name = project_name;
    //     });
    //     print("Successfully create a tasks named <strong>",project_name,"</strong> in Coup_de_Grace!");
    // }
    [[eosio::action]]
    void selectatask(const account_name author, uint64_t task_id){
        printask(task_id);
        print(" ||- description: ", thetask.description.c_str());
    }

    [[eosio::action]]
    void selectitems(const account_name author, string& filter, string& judge, string& value){
        taskIndex tasks(_self, _self);
        if(filter=="*"){
            for(int task_id = 0; task_id <= tasks.size(); task_id++){ //
                printask(task_id);
            }
        }else{
            for(int task_id = 0; task_id <= tasks.size(); task_id++){
                if(){
                    printask(task_id);
                }
            }
        }
        
    }

    [[eosio::action]]
    void Task::checkbyid(const account_name author, uint64_t project_id){
        // print("Inside checkbyid...");
        taskIndex tasks(_self, _self);
        auto iterator = tasks.find(project_id);
        eosio_assert(iterator != tasks.end(), "Project not found.");

        auto theprj = tasks.get(project_id);
        print("||| Id: ", theprj.id);
        print(" ||- Name: ", theprj.name.c_str());
        print(" ||- Items: ");
        if (theprj.items.size() > 0) {
            for (uint32_t i = 0; i < theprj.items.size(); i++) {
                // ATN： theprj.items.at(0).id = 1 ！！！！
                print("||id:",theprj.items.at(i).id, "  context:");
                print(theprj.items.at(i).name.c_str(), "  winners' number:");
                print(theprj.items.at(i).winumber,"  cadidates' number:");
                print(theprj.items.at(i).cadidates.size(), "  |-winners:");
                if (theprj.items.at(i).winners.size() > 0) {
                    for (uint32_t j = 0; j < theprj.items.at(i).winners.size(); j++) {
                        print(theprj.items.at(i).winners.at(j)," ");
                    }
                }else {
                    print("not generated yet ");
                }
            }
        } else {
            print(" Undefined ");
        }
        print("\n");
    }

    [[eosio::action]]
    void Task::checkn(const account_name author, int number){
        taskIndex tasks(_self, _self);
        for(int project_id = 1; project_id <= number; project_id++){
            auto iterator = tasks.find(project_id);
            eosio_assert(iterator != tasks.end(), "Project not found.");
            auto theprj = tasks.get(project_id);
            print("||| Id: ", theprj.id);
            print(" ||- Name: ", theprj.name.c_str());
            print(" ||- Items: ");
            if (theprj.items.size() > 0) {
                for (uint32_t i = 0; i < theprj.items.size(); i++) {
                    print("||id:",theprj.items.at(i).id, "  context:");
                    print(theprj.items.at(i).name.c_str(), "  winners' number:");
                    print(theprj.items.at(i).winumber,"  cadidates' number:");
                    print(theprj.items.at(i).cadidates.size(), "  |-winners:");
                    if (theprj.items.at(i).winners.size() > 0) {
                        for (uint32_t j = 0; j < theprj.items.at(i).winners.size(); j++) {
                            print(theprj.items.at(i).winners.at(j)," ");
                        }
                    }else {
                        print("not generated yet ");
                    }
                }
            } else {
                print(" Undefined ");
            }
        }
        print("\n");
    }

    [[eosio::action]]
    void Task::additem(const account_name author, uint64_t project_id, uint64_t item_id, string& item_name, uint32_t winumber, uint32_t maxnumber){
        taskIndex tasks(_self, _self);
        auto iterator = tasks.find(project_id);
        eosio_assert(iterator != tasks.end(), "Project not found.");

        tasks.modify(iterator, author, [&](auto& surpriseprj) {
            surpriseprj.items.push_back(surpriseitem{
                item_id,
                item_name,
                winumber,
                maxnumber
            });
        });
        print("Successfully add an item named <strong>",item_name,"</strong>!");
    }

    [[eosio::action]]
    void Task::addcad(const account_name author, uint64_t project_id, uint64_t item_id, string& cadname){
        taskIndex tasks(_self, _self);
        auto iterator = tasks.find(project_id);
        eosio_assert(iterator != tasks.end(), "Project not found.");

        tasks.modify(iterator, author, [&](auto& surpriseprj) {
            surpriseprj.items[item_id-1].cadidates.push_back(cadname);
        });
        print("Successfully add a cadidate named <strong>",cadname,"</strong>!");
    }
    
    [[eosio::action]]
    void Task::activate(const account_name author, uint64_t project_id, uint64_t item_id){
        taskIndex tasks(_self, _self);
        auto iterator = tasks.find(project_id);
        eosio_assert(iterator != tasks.end(), "Project not found.");

        auto theprj = tasks.get(project_id);
        auto theitem = theprj.items[item_id-1];
        eosio_assert(theitem.winners.size()==0, "This item already activated!!! No Twicy!!!");

        uint32_t cadnumber = theitem.cadidates.size();
        uint32_t winumber = theitem.winumber;
        print(theitem.winumber," out of ",cadnumber," will win.They are ");

        int lucky[MAX_CAD];//
        if(winumber<=cadnumber){
            for(int i=0; i<cadnumber; ){
                checksum256 result;
                auto mixedBlock = tapos_block_prefix() * tapos_block_num();
                const char *mixedChar = reinterpret_cast<const char *>(&mixedBlock);
                sha256( (char *)mixedChar, sizeof(mixedChar), &result);
                const char *p64 = reinterpret_cast<const char *>(&result);
                auto r = (abs((int64_t)p64[i]) % (cadnumber + 1 - 1)) + 1;  //1 to cadnumber
                int need_to_repeat=0;
                for(int j=0;j<5;j++){
                    if(r==lucky[j]){
                        need_to_repeat=1;
                        break;
                    }
                }
                if(need_to_repeat==0){
                    print(" ", r);
                    lucky[i++]=r;
                }
                if(i==winumber)break;
            }
        }else{
            for(int i=0;i<cadnumber;i++){
                lucky[i]=i+1;
                print(" ", i+1);
            }
        }
        print(". ");

        for(int i=0; i<winumber; i++){
            string winner = theitem.cadidates[lucky[i]-1];
            tasks.modify(iterator, author, [&](auto& surpriseprj) {
                surpriseprj.items[item_id-1].winners.push_back(winner);
            });
        }

    }


}
