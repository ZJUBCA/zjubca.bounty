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

}
