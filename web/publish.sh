#! /bin/bash
function confirm()
{
    echo -n "$@ "
    read -e answer
    for response in y Y yes YES Yes Sure sure SURE OK ok Ok
    do
        if [ "_$answer" == "_$response" ]
        then
            return 0
        fi
    done

    # Any answer other than the list above is considerred a "no" answer
    return 1
}

confirm Are you sure you want to deploy?
 if [ $? -eq 0 ]
 then
    version=$(npm version patch)
    echo $version
    cd ..
    git subtree push --prefix web heroku master

    git commit -a -m "Created tags and Deployed $version"
    git tag "$version"
    git push && git push --tags
    read -rsp $'Done!!! Press enter to exit..' key
fi

