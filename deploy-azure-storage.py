import json
import os
import uuid
import sys
import mimetypes
import argparse
from azure.storage.blob import BlockBlobService, PublicAccess
from azure.storage.blob.models import ContentSettings


def list_files(dir):
    r = []
    for root, dirs, files in os.walk(dir):
        for name in files:
            r.append(os.path.join(root, name))
    return r


def get_version():
    with open('package.json') as json_file:
        data = json.load(json_file)

    return data['version'] or "6.1.167"


def copy_files(files, dest, cache_control):
    block_blob_service = BlockBlobService(args.StorageAccount, args.StorageKey)

    for file in files:
        ctype, encoding = mimetypes.guess_type(file)
        target = dest+file
        print("Copying " + file + " to " + target)
        block_blob_service.create_blob_from_path(
            args.BlobName, target, file, content_settings=ContentSettings(content_type=(ctype or 'application/octet-stream'), cache_control=cache_control))


def deployToAzure():
    print('\nCopy static folder assets to src')
    files = list_files('static')
    copy_files(files, 'src\\', 'max-age=900')

    print('\nCopy config folder assets to src')
    files = list_files('config')
    copy_files(files, 'src\\', 'max-age=900')

    # print('\nCopy toggles folder assets to root')
    # files = list_files('toggles')
    # copy_files(files, '', 'max-age=900')

    print('\nCopy remaining assets')
    # copy_files(['config\\schema.json'], '', 'no-cache')
    copy_files(['bootstrap.js'], '', 'max-age=900')
    copy_files(['asset-manifest.json', 'favicon.ico', 'index.html',
                'manifest.json'], 'src\\', 'max-age=900')


# Main method.
if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Azure DevOps script to deploy assets from Github to Azure Storage blobs')

    parser.add_argument('--BlobName', '--b',
                        help="Azure Storage Blob", type=str)

    parser.add_argument('--StorageAccount', '-a',
                        help="Azure Storage Container", type=str)

    parser.add_argument('--StorageKey', '--ak',
                        help="Azure Storage Access Key", type=str)

    args = parser.parse_args()

    if not any(vars(parser.parse_args()).values()):
        parser.print_help()
        exit()

    deployToAzure()

# python .\deploy-azure-storage.py --BlobName cbre-search-spa-v2 --StorageAccount devlistingsearchcbreeun --StorageKey 7y4JA2oLHS2NIlEDxIWkrazzkUZTc2OaHJYpB0K0/0zn91Gpfb6x3NT6nk0AYE2eV1JPKnTcJlbNOul7Fx4lhA==
# python .\deploy-azure-storage.py --BlobName $(AZURE_CONTAINER) --StorageAccount $(AZURE_STORAGE_ACCOUNT_DEV_EUN) --StorageKey $(AZURE_STORAGE_ACCESS_KEY_DEV_EUN)
