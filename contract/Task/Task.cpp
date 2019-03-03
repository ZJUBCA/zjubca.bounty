#include "Task.hpp"

const int FIRST_TASK_ID = 1;

namespace zjubcabounty{
    
    void Task::printask(uint64_t task_id){
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(task_id);
        eosio_assert(iterator != tasks.end(), "This task was NOT FOUND ... ");

        auto thetask = tasks.get(task_id);
        print("||| id: ", thetask.id);
        print(" ||- title: ", thetask.title.c_str());
        // print(" ||- description: ", thetask.description.c_str());
        print(" ||- status: ", thetask.status.c_str());
        print(" ||- rolenumbers: ", thetask.rolenumbers.c_str());
        print(" ||- reward: ", thetask.reward.c_str());
        print(" ||- pledge: ", thetask.pledge.c_str());
        print(" ||- updatedat: ", thetask.updatedat.c_str());
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
        print("|||");// \n
    }

    [[eosio::action]]
    void Task::create(const account_name author, uint64_t id, string& authorname, uint64_t authorid, string& title, 
    string& description, string& status, string& rolenumbers, string& reward, string& pledge, string& updatedat, 
    string& requires, string& likevote, string& hatevote){
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(id);
        eosio_assert(iterator == tasks.end(), "This ID of Task already existed !!!");

        tasks.emplace(author, [&](auto& tasks) {
            tasks.id = id;   tasks.title = title;   tasks.description = description;  tasks.status = status;  
            tasks.rolenumbers = rolenumbers;   tasks.reward = reward;   tasks.pledge = pledge; 
            tasks.updatedat = updatedat;   tasks.requires = requires;   tasks.likevote = likevote; 
            tasks.hatevote = hatevote; 
        });
        iterator = tasks.find(id);
        tasks.modify(iterator, author, [&](auto& tasks) {
            tasks.participants.push_back(user{
                authorid,
                authorname
            });
        });
        print("Successfully create a task named <strong>",title,"</strong> in ZJUBCA.Bounty!");
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
    void Task::selectatask(const account_name author, uint64_t task_id){
        printask(task_id);
        Task::taskIndex tasks(_self, _self);

        auto thetask = tasks.get(task_id);
        print(" ||- description: ", thetask.description.c_str());
    }

    [[eosio::action]]
    void Task::selectitems(const account_name author, string& filter, string& judge, string& value){
        // print("0");
        Task::taskIndex tasks(_self, _self);
        int task_id = 1;
        for(task_id = 1; ; task_id++){
            auto iterator = tasks.find(task_id);
            if(iterator == tasks.end()){
                break;
            }
        }
        int length = task_id - 1;
        // print("length = ",length);
        // print("1");
        if(filter=="*"){
            for(int task_id = FIRST_TASK_ID; task_id <= length ;task_id++){ // task_id <= tasks.size()
                printask(task_id);
            }
        }else{
            // print("2");
            if(filter=="tasktitle"){
                // print("3");
                if(judge=="equal"){
                    for(int task_id = FIRST_TASK_ID; task_id <= length ;task_id++){//task_id <= tasks.size()
                        // print("before break");
                        
                        auto thetask = tasks.get(task_id);
                        if(thetask.title.c_str()==value){
                            printask(task_id);
                        }
                        // else{
                        //     print(thetask.title.c_str()==value);
                        // }
                    }
                }else{
                    print("filter == tasktitle, but judge failed.");
                }
            }else if(filter=="taskstatus"){
                if(judge=="equal"){
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.status.c_str()==value)
                            printask(task_id);
                    }
                }else{
                    print("filter == taskstatus, but judge failed.");
                }
            }else if(filter=="taskauthor"){
                 if(judge=="equal"){
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.participants.at(0).username.c_str()==value)
                            printask(task_id);
                    }
                }else{
                    print("filter == taskauthor, but judge failed.");
                }
            }else if(filter=="taskreward"){
                if(judge=="equal"){
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.reward==value)
                            printask(task_id);
                    }
                }else if(judge=="bigger"){
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.reward > value)
                            printask(task_id);
                    }
                }else if(judge=="nosmaller"){
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.reward >= value)
                            printask(task_id);
                    }
                }else if(judge=="smaller"){
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.reward < value)
                            printask(task_id);
                    }
                }else if(judge=="nobigger"){
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.reward <= value)
                            printask(task_id);
                    }
                }else{
                    print("filter == taskreward, but judge failed.");
                }
            }
            
        }
        
    }

    // [[eosio::action]]
    // void Task::checkbyid(const account_name author, uint64_t project_id){
    //     // print("Inside checkbyid...");
    //     taskIndex tasks(_self, _self);
    //     auto iterator = tasks.find(project_id);
    //     eosio_assert(iterator != tasks.end(), "Project not found.");

    //     auto theprj = tasks.get(project_id);
    //     print("||| Id: ", theprj.id);
    //     print(" ||- Name: ", theprj.name.c_str());
    //     print(" ||- Items: ");
    //     if (theprj.items.size() > 0) {
    //         for (uint32_t i = 0; i < theprj.items.size(); i++) {
    //             // ATN： theprj.items.at(0).id = 1 ！！！！
    //             print("||id:",theprj.items.at(i).id, "  context:");
    //             print(theprj.items.at(i).name.c_str(), "  winners' number:");
    //             print(theprj.items.at(i).winumber,"  cadidates' number:");
    //             print(theprj.items.at(i).cadidates.size(), "  |-winners:");
    //             if (theprj.items.at(i).winners.size() > 0) {
    //                 for (uint32_t j = 0; j < theprj.items.at(i).winners.size(); j++) {
    //                     print(theprj.items.at(i).winners.at(j)," ");
    //                 }
    //             }else {
    //                 print("not generated yet ");
    //             }
    //         }
    //     } else {
    //         print(" Undefined ");
    //     }
    //     print("\n");
    // }

    // [[eosio::action]]
    // void Task::checkn(const account_name author, int number){
    //     taskIndex tasks(_self, _self);
    //     for(int project_id = 1; project_id <= number; project_id++){
    //         auto iterator = tasks.find(project_id);
    //         eosio_assert(iterator != tasks.end(), "Project not found.");
    //         auto theprj = tasks.get(project_id);
    //         print("||| Id: ", theprj.id);
    //         print(" ||- Name: ", theprj.name.c_str());
    //         print(" ||- Items: ");
    //         if (theprj.items.size() > 0) {
    //             for (uint32_t i = 0; i < theprj.items.size(); i++) {
    //                 print("||id:",theprj.items.at(i).id, "  context:");
    //                 print(theprj.items.at(i).name.c_str(), "  winners' number:");
    //                 print(theprj.items.at(i).winumber,"  cadidates' number:");
    //                 print(theprj.items.at(i).cadidates.size(), "  |-winners:");
    //                 if (theprj.items.at(i).winners.size() > 0) {
    //                     for (uint32_t j = 0; j < theprj.items.at(i).winners.size(); j++) {
    //                         print(theprj.items.at(i).winners.at(j)," ");
    //                     }
    //                 }else {
    //                     print("not generated yet ");
    //                 }
    //             }
    //         } else {
    //             print(" Undefined ");
    //         }
    //     }
    //     print("\n");
    // }

    [[eosio::action]]
    void Task::update(const account_name author, uint64_t id, string& title, string& description, string& rolenumbers, 
    string& reward, string& pledge, string& updatedat, string& requires){// ID is not changeable.
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(id);
        eosio_assert(iterator != tasks.end(), "This ID of Task NOT existed !!!");
        
        tasks.modify(iterator, author, [&](auto& tasks) {
            tasks.title = title;
            tasks.description = description;
            tasks.rolenumbers = rolenumbers;
            tasks.reward = reward;
            tasks.pledge = pledge;
            tasks.updatedat = updatedat;
            tasks.requires = requires;
        });

    }

    [[eosio::action]]
    void Task::updatestatus(const account_name author, uint64_t task_id, string& status){
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(task_id);
        eosio_assert(iterator != tasks.end(), "This ID of Task NOT existed !!!");
        
        tasks.modify(iterator, author, [&](auto& tasks) {
            tasks.status = status;
        });
    }

    [[eosio::action]]
    void Task::updatevotes(const account_name author, uint64_t task_id, string& likevote, string& hatevote){
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(task_id);
        eosio_assert(iterator != tasks.end(), "This ID of Task NOT existed !!!");
        
        tasks.modify(iterator, author, [&](auto& tasks) {
            tasks.likevote = likevote;
            tasks.hatevote = hatevote;
        });
    }

    //只有发任务者可以更新状态。并且会通知每个参加任务的人。
    [[eosio::action]]
    void Task::participate(const account_name author, uint64_t task_id, string& participantname, uint64_t participantid){
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(task_id);
        eosio_assert(iterator != tasks.end(), "This ID of Task NOT existed !!!");
        
        iterator = tasks.find(task_id);
        tasks.modify(iterator, author, [&](auto& tasks) {
            tasks.participants.push_back(user{
                participantid,
                participantname
            });
        });
    }

    [[eosio::action]]
    void Task::erase(const account_name author, uint64_t id){
        
    }

    // [[eosio::action]]
    // void Task::additem(const account_name author, uint64_t project_id, uint64_t item_id, string& item_name, uint32_t winumber, uint32_t maxnumber){
    //     taskIndex tasks(_self, _self);
    //     auto iterator = tasks.find(project_id);
    //     eosio_assert(iterator != tasks.end(), "Project not found.");

    //     tasks.modify(iterator, author, [&](auto& surpriseprj) {
    //         surpriseprj.items.push_back(surpriseitem{
    //             item_id,
    //             item_name,
    //             winumber,
    //             maxnumber
    //         });
    //     });
    //     print("Successfully add an item named <strong>",item_name,"</strong>!");
    // }

    // [[eosio::action]]
    // void Task::addcad(const account_name author, uint64_t project_id, uint64_t item_id, string& cadname){
    //     taskIndex tasks(_self, _self);
    //     auto iterator = tasks.find(project_id);
    //     eosio_assert(iterator != tasks.end(), "Project not found.");

    //     tasks.modify(iterator, author, [&](auto& surpriseprj) {
    //         surpriseprj.items[item_id-1].cadidates.push_back(cadname);
    //     });
    //     print("Successfully add a cadidate named <strong>",cadname,"</strong>!");
    // }
    
    // [[eosio::action]]
    // void Task::activate(const account_name author, uint64_t project_id, uint64_t item_id){
    //     taskIndex tasks(_self, _self);
    //     auto iterator = tasks.find(project_id);
    //     eosio_assert(iterator != tasks.end(), "Project not found.");

    //     auto theprj = tasks.get(project_id);
    //     auto theitem = theprj.items[item_id-1];
    //     eosio_assert(theitem.winners.size()==0, "This item already activated!!! No Twicy!!!");

    //     uint32_t cadnumber = theitem.cadidates.size();
    //     uint32_t winumber = theitem.winumber;
    //     print(theitem.winumber," out of ",cadnumber," will win.They are ");

    //     int lucky[MAX_CAD];//
    //     if(winumber<=cadnumber){
    //         for(int i=0; i<cadnumber; ){
    //             checksum256 result;
    //             auto mixedBlock = tapos_block_prefix() * tapos_block_num();
    //             const char *mixedChar = reinterpret_cast<const char *>(&mixedBlock);
    //             sha256( (char *)mixedChar, sizeof(mixedChar), &result);
    //             const char *p64 = reinterpret_cast<const char *>(&result);
    //             auto r = (abs((int64_t)p64[i]) % (cadnumber + 1 - 1)) + 1;  //1 to cadnumber
    //             int need_to_repeat=0;
    //             for(int j=0;j<5;j++){
    //                 if(r==lucky[j]){
    //                     need_to_repeat=1;
    //                     break;
    //                 }
    //             }
    //             if(need_to_repeat==0){
    //                 print(" ", r);
    //                 lucky[i++]=r;
    //             }
    //             if(i==winumber)break;
    //         }
    //     }else{
    //         for(int i=0;i<cadnumber;i++){
    //             lucky[i]=i+1;
    //             print(" ", i+1);
    //         }
    //     }
    //     print(". ");

    //     for(int i=0; i<winumber; i++){
    //         string winner = theitem.cadidates[lucky[i]-1];
    //         tasks.modify(iterator, author, [&](auto& surpriseprj) {
    //             surpriseprj.items[item_id-1].winners.push_back(winner);
    //         });
    //     }

    // }


}
